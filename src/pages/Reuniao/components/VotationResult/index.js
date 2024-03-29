import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../components/Button';
import {
  Container,
  InfoContainer,
  InfoTitle,
  Info,
  ButtonContainer,
} from './styles';

import api from '../../../../services/api';

const VotationResult = ({
  id, tipo, pontoId, index, ponto, socket,
}) => {
  const [favor, setFavor] = useState(0);
  const [contra, setContra] = useState(0);
  const [abstencao, setAbstencao] = useState(0);
  const [resultado, setResultado] = useState('');
  const [votos, setVotos] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const resposta = await api.get(`/votacao/ponto/${pontoId}`);
        const { data } = resposta.data;

        const quantidadeMinima = (data.length / 2) + 1;
        const favoraveis = data.filter(({ VotoType: { tipo: voto } }) => (voto === 'Favorável')).length;
        const contras = data.filter(({ VotoType: { tipo: voto } }) => (voto === 'Contrário')).length;
        const abstencoes = data.length - (contras + favoraveis);

        setFavor(favoraveis);
        setContra(contras);
        setAbstencao(abstencoes);
        setVotos(data);

        if (favoraveis > quantidadeMinima) {
          setResultado('Aprovado');
          await api.put(`/ponto/${pontoId}`, { situacao: 'Aprovado' });
        } else if (favoraveis === quantidadeMinima) {
          setResultado('Empate');
          await api.put(`/ponto/${pontoId}`, { situacao: 'Empate' });
        } else {
          setResultado('Reprovado');
          await api.put(`/ponto/${pontoId}`, { situacao: 'Reprovado' });
        }
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  socket.on('minerva_vote', ({ vote }) => {
    if (vote) setResultado('Aprovado');
    else setResultado('Reprovado');
  });

  const handleNext = () => {
    socket.emit('next_topic', { secretaryId: id, ponto: index + 1 });
  };

  const handleMinerva = async (voto) => {
    try {
      const resposta = await api.post('/votacao', {
        secreto: false,
        user_id: id,
        voto_type: (voto ? 'Favorável' : 'Contrário'),
        ponto_id: pontoId,
      });
      await api.put(`/ponto/${pontoId}`, { situacao: voto ? 'Aprovado' : 'Reprovado' });
      console.log(resposta.data);
      socket.emit('minerva_vote', { presidenteId: id, voto });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <InfoContainer>
        <InfoTitle>{`Resultado da votação do ponto "${ponto}"`}</InfoTitle>
        {
          votos.length <= 10 && votos.map(({ User, VotoType }) => (
            <Info key={User.matricula}>{`${User.nome} votou ${VotoType.tipo}`}</Info>
          ))
        }
        <Info>{`Votos a favor: ${favor}`}</Info>
        <Info>{`Votos Contra: ${contra}`}</Info>
        <Info>{`Abstenções: ${abstencao}`}</Info>
        <InfoTitle>{`Situação: ${resultado}`}</InfoTitle>
        {
          (() => {
            if (tipo === 'Presidente' && resultado === 'Empate') {
              return (
                <ButtonContainer>
                  <Button onClick={() => handleMinerva(true)}>Aprovar</Button>
                  <Button onClick={() => handleMinerva(false)}>Reprovar</Button>
                </ButtonContainer>
              );
            }
            if (tipo === 'Administrador' && resultado !== 'Empate') {
              return (
                <ButtonContainer>
                  <Button onClick={handleNext}>Próximo Ponto</Button>
                </ButtonContainer>
              );
            }
            return null;
          })()
        }
      </InfoContainer>
    </Container>
  );
};

VotationResult.propTypes = {
  id: PropTypes.string.isRequired,
  tipo: PropTypes.string.isRequired,
  pontoId: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  ponto: PropTypes.string.isRequired,
  socket: PropTypes.shape({
    on: PropTypes.func.isRequired,
    emit: PropTypes.func.isRequired,
  }).isRequired,
};

export default React.memo(VotationResult);

import React, { useState, useEffect } from 'react';
import Button from '../../../../components/Button';
import {
  Container,
  InfoContainer,
  Info,
  ButtonContainer,
} from './styles';

import api from '../../../../services/api';

const VotationResult = ({ pontoId, index, ponto, socket }) => {
  const [favor, setFavor] = useState(0);
  const [contra, setContra] = useState(0);
  const [absten, setAbsten] = useState(0);

  const id = sessionStorage.getItem('@user_id');
  const tipo = sessionStorage.getItem('@user_type');

  useEffect(() => {
    (async () => {
      try {
        const resposta = await api.get(`/votacao/ponto/${pontoId}`);
        const { data } = resposta.data;
        setFavor(data.filter(({ VotoType: { tipo } }) => (tipo === 'Favorável')).length);
        setContra(data.filter(({ VotoType: { tipo } }) => tipo === 'Contrário').length);
        setAbsten(data.filter(({ VotoType: { tipo } }) => tipo === 'Abstenção').length);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const handleNext = () => {
    socket.emit('next_topic', { secretaryId: id, ponto: index + 1 });
  };

  return (
    <Container>
      <InfoContainer>
        <Info>{`Resultado da votação do ponto ${ponto}`}</Info>
        <Info>{`Votos a favor: ${favor}`}</Info>
        <Info>{`Votos Contra: ${contra}`}</Info>
        <Info>{`Abstenções: ${absten}`}</Info>
        {
          tipo === 'Administrador' ? (
            <ButtonContainer>
              <Button onClick={handleNext}>Próximo Ponto</Button>
            </ButtonContainer>
          ) : null
        }
      </InfoContainer>
    </Container>
  );
};

export default React.memo(VotationResult);

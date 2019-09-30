import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CloudDownloadRounded } from '@material-ui/icons';
import Button from '../../../../components/Button';
import {
  Container,
  InfoContainer,
  InfoTitle,
  Info,
  IconContainer,
  ButtonsContainer,
  ButtonContainer,
  StyledButton,
} from './styles';

import { withSnackbarBottom } from '../../../../components/SnackbarBottom';

import api from '../../../../services/api';

const Votation = ({
  id, tipo,
  socket, votavel, pontoId, index, ponto, anexo,
  reuniaoId,
  openSnackbar,
}) => {
  const [start, setStart] = useState(false);
  const [segundos, setSegundos] = useState(10);
  const [voto, setVoto] = useState('');

  const handleSave = async () => {
    try {
      const resposta = await api.post('/votacao', {
        secreto: false,
        user_id: id,
        voto_type: (voto !== '' ? voto : 'Abstenção'),
        ponto_id: pontoId,
      });
      console.log(resposta.data);
      openSnackbar('Voto salvo com sucesso!');
    } catch (e) {
      openSnackbar('Occoreu um erro ao salvar o voto');
      console.log(e);
    }
  };

  useEffect(() => {
    let interId = null;
    if (start && segundos > 0) interId = setInterval(() => setSegundos(segundos - 1), 1000);
    if (segundos === 0) {
      if (tipo === 'Administrador') {
        setTimeout(() => socket.emit('votation_result', { secretaryId: id }), 2000);
      } else if (tipo === 'Conselheiro') {
        handleSave();
      }
    }
    return () => clearInterval(interId);
  }, [start, segundos]);

  useEffect(() => {
    socket.emit('voting_time');
  }, []);

  socket.on('start_vote', () => {
    if (votavel) setStart(true);
  });

  socket.on('voting_time', ({ tempo }) => {
    setSegundos(tempo);
    if (tempo < 10 && votavel) setStart(true);
  });

  /* const CountTime = () => {
    const min = Math.floor(segundos / 60);
    const seg = Math.floor(segundos % 60);
    return `${min < 10 ? `0${min}` : min}:${seg < 10 ? `0${seg}` : seg}`;
  }; */

  const handleStartVote = () => {
    socket.emit('start_vote', { secretaryId: id });
  };

  const VoteButton = () => {
    if (votavel) {
      if (tipo === 'Administrador') {
        return (
          <>
            <InfoContainer>
              <InfoTitle>Tempo Restante:</InfoTitle>
              <Info>{`${segundos} segundos`}</Info>
            </InfoContainer>
            {
              !start ? (
                <ButtonContainer>
                  <Button onClick={handleStartVote}>Começar Contagem</Button>
                </ButtonContainer>
              ) : null
            }
          </>
        );
      }
      if (tipo === 'Conselheiro') {
        return (
          <>
            <InfoContainer>
              <InfoTitle>Tempo Restante:</InfoTitle>
              <Info>{`${segundos} segundos`}</Info>
            </InfoContainer>
            <ButtonsContainer>
              <ButtonContainer>
                <StyledButton mark={voto === 'Favorável'} onClick={() => setVoto('Favorável')}>A favor</StyledButton>
              </ButtonContainer>
              <ButtonContainer>
                <StyledButton mark={voto === 'Contrário'} onClick={() => setVoto('Contrário')}>Contra</StyledButton>
              </ButtonContainer>
              <ButtonContainer>
                <StyledButton mark={voto === 'Abstenção'} onClick={() => setVoto('Abstenção')}>Abster-se</StyledButton>
              </ButtonContainer>
            </ButtonsContainer>
          </>
        );
      }
    }
    return null;
  };

  const AppendButton = () => (anexo ? (
    <IconContainer>
      <CloudDownloadRounded />
    </IconContainer>
  ) : null);

  const handleClick = () => {
    socket.emit('next_topic', { secretaryId: id, ponto: index + 1 });
  };

  const handleEndMeeting = async () => {
    try {
      await api.put(`/reuniao/status/${reuniaoId}`, { descricao: 'Finalizada' });
      socket.emit('end_meeting', { secretaryId: id });
    } catch (e) {
      console.log(e);
    }
  };

  const NextButton = () => {
    if (tipo === 'Administrador' && !votavel) {
      if (index === -1) {
        return (
          <ButtonContainer>
            <Button onClick={handleClick}>Próximo Ponto</Button>
          </ButtonContainer>
        );
      }
      return (
        <ButtonContainer>
          <Button onClick={handleEndMeeting}>Finalizar Reunião</Button>
        </ButtonContainer>
      );
    }
    return null;
  };

  return (
    <Container>
      <InfoContainer>
        <InfoTitle>Ponto em discussão</InfoTitle>
        <Info>{ponto}</Info>
      </InfoContainer>
      <AppendButton />
      <VoteButton />
      <NextButton />
    </Container>
  );
};

Votation.propTypes = {
  id: PropTypes.string.isRequired,
  tipo: PropTypes.string.isRequired,
  votavel: PropTypes.bool.isRequired,
  pontoId: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  ponto: PropTypes.string.isRequired,
  anexo: PropTypes.bool.isRequired,
  openSnackbar: PropTypes.func.isRequired,
  socket: PropTypes.shape({
    on: PropTypes.func.isRequired,
    emit: PropTypes.func.isRequired,
  }).isRequired,
};

export default withSnackbarBottom(Votation);

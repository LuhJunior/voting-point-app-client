import React, { useState, useEffect } from 'react';
import { CloudDownloadRounded } from '@material-ui/icons';
import Button from '../../../../components/Button';
import {
  Container,
  Title,
  InfoContainer,
  Info,
  IconContainer,
  ButtonsContainer,
  ButtonContainer,
} from './styles';

import { withSnackbarBottom } from '../../../../components/SnackbarBottom';

import api from '../../../../services/api';

const Votation = ({ socket, votavel, pontoId, index, ponto, anexo, openSnackbar }) => {
  const id = sessionStorage.getItem('@user_id');
  const tipo = sessionStorage.getItem('@user_type');
  const [start, setStart] = useState(false);
  const [segundos, setSegundos] = useState(30);
  const [voto, setVoto] = useState(-1);

  const handleSave = async () => {
    try {
      const resposta = await api.post('/votacao', {
        secreto: true,
        user_id: id,
        voto_type_id: (voto !== -1 ? voto : 1),
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
      if (tipo === 'Administrador') socket.emit('next_topic', { secretaryId: id, ponto: index + 1 });
      else handleSave();
    }
    return () => clearInterval(interId);
  }, [start, segundos]);

  socket.on('start_vote', () => setStart(true));

  const CountTime = () => {
    /* const horas = Math.floor(segundos / 3600); */
    const min = Math.floor(segundos / 60);
    const seg = Math.floor(segundos % 60);
    return `00:${min < 10 ? `0${min}` : min}:${seg < 10 ? `0${seg}` : seg}`;
  };

  const handleStartVote = () => {
    socket.emit('start_vote', { secretaryId: id });
    setStart(true);
  };

  const VoteButton = () => (votavel ? (
    tipo === 'Administrador' ? (
      <>
        <InfoContainer>
          <Info>Tempo Restante: {CountTime()}</Info>
        </InfoContainer>
        {
          !start ? (
            <ButtonContainer>
              <Button onClick={handleStartVote}>Começar Contagem</Button>
            </ButtonContainer>
          ) : null
        }
      </>
    ) : (
      <>
        <InfoContainer>
          <Info>Tempo Restante: {CountTime()}</Info>
        </InfoContainer>
        <ButtonsContainer>
          <ButtonContainer>
            <Button mark={voto === 3} onClick={() => setVoto(3)}>A favor</Button>
          </ButtonContainer>
          <ButtonContainer>
            <Button mark={voto === 1} onClick={() => setVoto(1)}>Contra</Button>
          </ButtonContainer>
          <ButtonContainer>
            <Button mark={voto === 2} onClick={() => setVoto(2)}>Abster-se</Button>
          </ButtonContainer>
        </ButtonsContainer>
      </>
    )
  ) : null);

  const AppendButton = () => (anexo ? (
    <IconContainer>
      <CloudDownloadRounded />
    </IconContainer>
  ) : null);

  const handleClick = () => {
    socket.emit('next_topic', { secretaryId: id, ponto: index + 1 });
  };

  const handleEndMeeting = () => {
    socket.emit('end_meeting', { secretaryId: id });
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
      <Title>Ponto em discussão</Title>
      <InfoContainer>
        <Info>{ponto}</Info>
      </InfoContainer>
      <AppendButton />
      <VoteButton />
      <NextButton />
    </Container>
  );
};

export default withSnackbarBottom(Votation);

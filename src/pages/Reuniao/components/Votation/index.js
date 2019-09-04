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


const Votation = ({ socket, votavel, ponto, anexo }) => {
  const id = sessionStorage.getItem('@user_id');
  const tipo = sessionStorage.getItem('@user_type');
  const [start, setStart] = useState(false);
  const [segundos, setSegundos] = useState(90);

  useEffect(() => {
    let interId = null;
    if (start && segundos > 0) interId = setInterval(() => setSegundos(segundos - 1), 1000);
    else setStart(false);
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
        <ButtonContainer>
          <Button onClick={handleStartVote}>Começar Contagem</Button>
        </ButtonContainer>
      </>
    ) : (
      <>
        <InfoContainer>
          <Info>Tempo Restante: 00:01:30</Info>
        </InfoContainer>
        <ButtonsContainer>
          <ButtonContainer>
            <Button>A favor</Button>
          </ButtonContainer>
          <ButtonContainer>
            <Button>Contra</Button>
          </ButtonContainer>
          <ButtonContainer>
            <Button>Abster-se</Button>
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
    socket.emit('next_topic', { secretaryId: id });
  };

  const NextButton = () => (tipo === 'Administrador' && !votavel ? (
    <ButtonContainer>
      <Button onClick={handleClick}>Próximo Ponto</Button>
    </ButtonContainer>
  ) : null);

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

export default Votation;

import React, { useState } from 'react';
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


const Votation = () => {

  return (
    <Container>
      <Title>Votação</Title>
      <InfoContainer>
        <Info>Um ponto qualquer</Info>
      </InfoContainer>
      <InfoContainer>
        <Info>Tempo Restante: 00:01:30</Info>
      </InfoContainer>
      <IconContainer>
        <CloudDownloadRounded />
      </IconContainer>
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
    </Container>
  );
};

export default Votation;

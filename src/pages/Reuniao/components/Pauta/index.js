import React, { useState } from 'react';
import { CloudDownloadRounded, CloseRounded } from '@material-ui/icons';
import Button from '../../../../components/Button';
import {
  Container,
  Title,
  InfoContainer,
  IconContainer,
  Info,
  LineContainer,
} from './styles';


const Pauta = ({ next }) => {
  const [pontos, setPontos] = useState([
    'teste',
    'teste',
    'teste',
    'teste',
    'teste',
  ]);
  const RenderPontos = () => pontos.map(ponto => (
    <LineContainer>
      <Info>{ponto}</Info>
      <IconContainer>
        <CloudDownloadRounded />
        <CloseRounded />
      </IconContainer>
    </LineContainer>
  ));
  return (
    <Container>
      <Title>Pontos</Title>
      <InfoContainer>
        <RenderPontos />
      </InfoContainer>
      <Button onClick={next}>Sugerir Ponto</Button>
    </Container>
  );
};

export default Pauta;

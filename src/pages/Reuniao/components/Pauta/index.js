import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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

const Pauta = ({ id, tipo, socket, pontos = [] }) => {

  const RenderPontos = () => pontos.map(({ ponto, anexo }) => (
    <LineContainer>
      <Info>{ponto}</Info>
      <IconContainer>
        { anexo ? <CloudDownloadRounded /> : null}
        <CloseRounded />
      </IconContainer>
    </LineContainer>
  ));

  useEffect(() => {
    try {
      const id = sessionStorage.getItem('@user_id');
      const tipo = sessionStorage.getItem('@user_type');
      if (tipo !== 'Administrador') socket.emit('join_room', { userId: id });
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <Container>
      <Title>Pauta</Title>
      <InfoContainer>
        <RenderPontos />
      </InfoContainer>
      <Button>Sugerir Ponto</Button>
    </Container>
  );
};

Pauta.propTypes = {
  id: PropTypes.number.isRequired,
  tipo: PropTypes.string.isRequired,
  pontos: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  socket: PropTypes.shape({
    emit: PropTypes.func.isRequired,
  }).isRequired,
};


export default Pauta;

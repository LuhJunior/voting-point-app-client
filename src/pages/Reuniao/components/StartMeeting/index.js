import React, { useState, useEffect } from 'react';
import Button from '../../../../components/Button';
import {
  Container,
  InfoContainer,
  Info,
  ButtonContainer,
} from './styles';

// import api from '../../../../services/api';

const StartMeeting = ({ reuniaoId, socket, next }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = sessionStorage.getItem('@user_id');
    const tipo = sessionStorage.getItem('@user_type');
    socket.emit('create_room', { secretaryId: id, reuniaoId });
    next();
  };

  return (
    <Container>
      <InfoContainer>
        <Info>A reunião já pode ser habilitada</Info>
        <ButtonContainer>
          <Button onClick={handleSubmit}>Criar Sala de Reunião</Button>
        </ButtonContainer>
      </InfoContainer>
    </Container>
  );
};

export default React.memo(StartMeeting);

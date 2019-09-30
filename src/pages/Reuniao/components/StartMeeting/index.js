import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Button from '../../../../components/Button';
import {
  Container,
  InfoContainer,
  Info,
  ButtonContainer,
} from './styles';

// import api from '../../../../services/api';

const StartMeeting = ({ id, tipo, reuniaoId, socket }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('create_room', { secretaryId: id, reuniaoId });
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

StartMeeting.propTypes = {
  id: PropTypes.string.isRequired,
  tipo: PropTypes.string.isRequired,
  reuniaoId: PropTypes.number.isRequired,
  socket: PropTypes.shape({
    emit: PropTypes.func.isRequired,
  }).isRequired,
};

export default React.memo(StartMeeting);

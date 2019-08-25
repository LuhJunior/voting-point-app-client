import React, { useState } from 'react';
import Button from '../../../../components/Button';
import {
  Container,
  InfoContainer,
  Info,
  ButtonContainer,
} from './styles';


const QuorumCount = ({ socket, next }) => {
  const [quantidade, setQuantidade] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('StartMeeting');
  };

  return (
    <Container>
      <InfoContainer>
        <Info>
          Contagem de Quorúm: {quantidade}
        </Info>
        <ButtonContainer>
          <Button onClick={handleSubmit}>Começar Reunião</Button>
        </ButtonContainer>
      </InfoContainer>
    </Container>
  );
};

export default QuorumCount;

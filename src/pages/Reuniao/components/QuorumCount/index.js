import React, { useState } from 'react';
import Button from '../../../../components/Button';
import {
  Container,
  InfoContainer,
  Info,
  ButtonContainer,
} from './styles';


const QuorumCount = ({ next }) => {
  const [quantidade, setQuantidade] = useState(0);
  return (
    <Container>
      <InfoContainer>
        <Info>
          Contagem de Quorúm: {quantidade}
        </Info>
        <ButtonContainer>
          <Button onClick={next}>Começar Reunião</Button>
        </ButtonContainer>
      </InfoContainer>
    </Container>
  );
};

export default QuorumCount;

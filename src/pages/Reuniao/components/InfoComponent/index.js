import React from 'react';
import {
  Container,
  InfoContainer,
  Info,
} from './styles';


const SemReuniao = ({ msg }) => (
  <Container>
    <InfoContainer>
      <Info>
        {msg}
      </Info>
    </InfoContainer>
  </Container>
);

export default SemReuniao;

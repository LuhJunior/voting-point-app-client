import React from 'react';
import styled from 'styled-components';

import Card from '../../../../components/Card';

const Container = styled(Card)`
  margin-bottom: 15px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`;

const Title = styled.span`
  font-family: 'Helvetica';
  font-size: 20px;
  font-weight: 300;
  margin-bottom: 10px;
  color: white;
`;

const Info = styled.span`
  font-family: 'Helvetica';
  font-size: 18px;
  margin-bottom: 15px;
  color: white;
`;

const InfoCard = ({ nome, matricula, tipo }) => {
  return (
    <Container>
      <InfoContainer>
        <Title>Nome do Usuário</Title>
        <Info>{nome}</Info>
        <Title>Matricula</Title>
        <Info>{matricula}</Info>
      </InfoContainer>
      <InfoContainer>
        <Title>Tipo do Usuário</Title>
        <Info>{tipo}</Info>
      </InfoContainer>
    </Container>
  );
};

export default React.memo(InfoCard);

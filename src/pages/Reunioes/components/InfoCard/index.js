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

const InfoCard = ({
  id, data, horaInicio, horaFim, ReuniaoType, Pontos,
}) => {
  return (
    <Container>
      <InfoContainer>
        <Title>Data da reunião</Title>
        <Info>{data}</Info>
        <Title>Horário de Inicío</Title>
        <Info>{horaInicio}</Info>
      </InfoContainer>
      <InfoContainer>
        <Title>Tipo da reunião</Title>
        <Info>{ReuniaoType.tipo}</Info>
        <Title>Horário de Término</Title>
        <Info>{horaFim}</Info>
      </InfoContainer>
    </Container>
  );
};

export default React.memo(InfoCard);

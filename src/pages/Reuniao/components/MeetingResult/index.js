import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  InfoContainer,
  InfoTitle,
  Info,
} from './styles';

import api from '../../../../services/api';

const MeetingResult = ({ id }) => {
  const [reuniao, setReuniao] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const resposta = await api.get(`/reuniao/${id}`);
        const { data } = resposta.data;
        console.log(data);
        setReuniao(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <Container>
      <InfoContainer>
        <InfoTitle>{`Resultado da reunião ${reuniao.titulo}`}</InfoTitle>
        {
          reuniao.Ponto && reuniao.Ponto.map(({ id: key, ponto, Situacao }) => (
            <Info key={key}>{`O ponto "${ponto}" foi ${Situacao.descricao}`}</Info>
          ))
        }
      </InfoContainer>
    </Container>
  );
};

MeetingResult.propTypes = {
  id: PropTypes.number.isRequired,
};

export default React.memo(MeetingResult);

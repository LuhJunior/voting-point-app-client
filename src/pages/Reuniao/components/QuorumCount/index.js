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

const QuorumCount = ({ id, tipo, reuniaoId, socket }) => {

  const [quantidade, setQuantidade] = useState(0);
  const [quorum, setQuorum] = useState(0);

  socket.on('quorum_count', ({ count }) => {
    console.log(count);
    setQuantidade(count);
    /* try {
      const resposta = await api.get(`/participacao/reuniao/${reuniaoId}`);
      const { data } = resposta.data;
      console.log(data);
      setQuantidade(data.length);
    } catch (e) {
      console.log(e);
    } */
  });

  useEffect(() => {
    (async () => {
      try {
        /* const id = sessionStorage.getItem('@user_id');
        const tipo = sessionStorage.getItem('@user_type'); */
        if (tipo === 'Administrador') socket.emit('quorum_count', { userId: id });
        else if (tipo === 'Conselheiro') socket.emit('join_room', { userId: id });
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const handleSubmit = (e) => {
    /* const id = sessionStorage.getItem('@user_id'); */
    e.preventDefault();
    socket.emit('start_meeting', { secretaryId: id });
  };

  const StartButton = () => (quantidade > quorum ? (
    <ButtonContainer>
      <Button onClick={handleSubmit}>Começar Reunião</Button>
    </ButtonContainer>
  ) : null);

  return (
    <Container>
      <InfoContainer>
        <Info>
          Contagem de Quorúm: {quantidade}
        </Info>
        <StartButton />
      </InfoContainer>
    </Container>
  );
};

QuorumCount.propTypes = {
  id: PropTypes.string.isRequired,
  tipo: PropTypes.string.isRequired,
  reuniaoId: PropTypes.number.isRequired,
  socket: PropTypes.shape({
    on: PropTypes.func.isRequired,
    emit: PropTypes.func.isRequired,
  }).isRequired,
};

export default QuorumCount;

import React, { useState, useEffect } from 'react';
import Button from '../../../../components/Button';
import {
  Container,
  InfoContainer,
  Info,
  ButtonContainer,
} from './styles';

// import api from '../../../../services/api';

const QuorumCount = ({ reuniaoId, socket, next }) => {
  const [quantidade, setQuantidade] = useState(0);

  socket.on('quorum_count', ({ count }) => {
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
        const id = sessionStorage.getItem('@user_id');
        const tipo = sessionStorage.getItem('@user_type');
        if (tipo === 'Administrador') socket.emit('create_room', { secretaryId: id });
        else socket.emit('join_room', { userId: id });
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

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

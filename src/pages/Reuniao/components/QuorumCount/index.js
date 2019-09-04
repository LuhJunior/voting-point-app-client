import React, { useState, useEffect } from 'react';
import Button from '../../../../components/Button';
import {
  Container,
  InfoContainer,
  Info,
  ButtonContainer,
} from './styles';

// import api from '../../../../services/api';

const QuorumCount = ({ reuniaoId, socket }) => {
  const [quantidade, setQuantidade] = useState(0);
  const [quorum, setQuorum] = useState(1);

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
    const id = sessionStorage.getItem('@user_id');
    e.preventDefault();
    socket.emit('start_meeting', { secretaryId: id });
  };

  const StartButton = () => (quantidade === quorum ? (
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

export default QuorumCount;

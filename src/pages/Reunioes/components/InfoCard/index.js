import React, { useState } from 'react';
import { Tooltip, IconButton, Modal } from '@material-ui/core';

import Card from '../../../../components/Card';
import Button from '../../../../components/Button';
import { withSnackbarBottom } from '../../../../components/SnackbarBottom';

import {
  Container,
  LineContainer,
  InfoContainer,
  Title,
  Info,
  IconContainer,
  AtivarIcon,
  EditarIcon,
  DeletarIcon,
  PontosIcon,
  ModalContainer,
} from './styles';

import api from '../../../../services/api';

const InfoCard = ({
  id, titulo, data, horaInicio, segundaChamada, tipo, habilitar, status, pontos, openSnackbar,
}) => {
  const [pontosModal, setPontosModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const habilitarButton = () => (!habilitar && status === null
    && data === new Date().toLocaleDateString()
    && new Date().toLocaleTimeString() < segundaChamada
  );

  const handleHabilitar = async (e) => {
    e.preventDefault();
    try {
      const resposta = await api.put(`reuniao/status/${id}`, { descricao: 'Habilitada' });
      openSnackbar('Reunião ativada');
      console.log(resposta.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeletar = async () => {
    try {
      const resposta = await api.delete(`reuniao/${id}`);
      openSnackbar('Reunião deletada');
      setDeleteModal(false);
      console.log(resposta.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <LineContainer>
        <InfoContainer>
          <Title>Título da reunião</Title>
          <Info>{titulo}</Info>
        </InfoContainer>
        <InfoContainer>
          <Title>Tipo da reunião</Title>
          <Info>{tipo}</Info>
        </InfoContainer>
      </LineContainer>
      <LineContainer>
        <InfoContainer>
          <Title>Horário de Inicío</Title>
          <Info>{horaInicio}</Info>
        </InfoContainer>
        <InfoContainer>
          <Title>Segunda Chamada</Title>
          <Info>{segundaChamada}</Info>
        </InfoContainer>
      </LineContainer>
      <LineContainer>
        <InfoContainer>
          <Title>Data da reunião</Title>
          <Info style={{ marginBottom: 0 }}>{data}</Info>
        </InfoContainer>
      </LineContainer>
      <IconContainer>
        <Tooltip title="Visualizar Pontos">
          <IconButton onClick={() => setPontosModal(true)}>
            <PontosIcon />
          </IconButton>
        </Tooltip>
        {
          habilitarButton() ? (
            <Tooltip title="Habilitar Reunião">
              <IconButton onClick={handleHabilitar}>
                <AtivarIcon />
              </IconButton>
            </Tooltip>
          ) : null
        }
        <Tooltip title="Editar Reunião">
          <IconButton>
            <EditarIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Deletar Reunião">
          <IconButton onClick={() => setDeleteModal(true)}>
            <DeletarIcon />
          </IconButton>
        </Tooltip>
      </IconContainer>
      <Modal
        open={pontosModal}
        onClose={() => setPontosModal(false)}
      >
        <ModalContainer>
          <Card style={{ flexDirection: 'column' }}>
            {pontos.map(({ ponto }) => (<LineContainer><Info>{ponto}</Info></LineContainer>))}
          </Card>
        </ModalContainer>
      </Modal>
      <Modal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
      >
        <ModalContainer>
          <Card>
            <LineContainer>
              <Title>Tem certeza que quer apagar a reunião ?</Title>
            </LineContainer>
            <LineContainer>
              <InfoContainer>
                <Button onClick={handleDeletar}>Deletar</Button>
              </InfoContainer>
              <InfoContainer>
                <Button onClick={() => setDeleteModal(false)}>Cancelar</Button>
              </InfoContainer>
            </LineContainer>
          </Card>
        </ModalContainer>
      </Modal>
    </Container>
  );
};

export default React.memo(withSnackbarBottom(InfoCard));

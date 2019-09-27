import React, { useState, useEffect, useCallback } from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import { PersonRounded } from '@material-ui/icons';

import Table from '../../components/Table';

import api from '../../services/api';

import InfoCard from './components/InfoCard';

import {
  Container,
  InfoContainer,
  IconContainer,
  Title,
  TableContainer,
  TableIconsContainer,
  AtivarIcon,
  DeletarIcon,
  EditarIcon,
} from './styles';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  /* const ReuniaoIcons = useCallback(({ id, date }) => (
    <TableIconsContainer>
      {
        date.toDateString() === new Date().toDateString() ? (
          <Tooltip title="Ativar Reunião">
            <IconButton>
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
        <IconButton>
          <DeletarIcon />
        </IconButton>
      </Tooltip>
    </TableIconsContainer>
  ), []); */

  useEffect(() => {
    (async () => {
      try {
        const resposta = await api.get('/users/all');
        const { data } = resposta.data;
        console.log(data);
        setUsuarios(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <Container>
      <InfoContainer>
        <IconContainer>
          <PersonRounded />
        </IconContainer>
        <Title>Usuários</Title>
      </InfoContainer>
      {
        usuarios.map(({
          id, nome, matricula, UserType: { tipo },
        }) => (
          <InfoCard
            key={id}
            nome={nome}
            matricula={matricula}
            tipo={tipo}
          />
        ))
      }
      {/* <TableContainer>
        <Table
          header={[
            'Data',
            'Horário de Inicío',
            'Horário de Término',
            'Tipo',
            'Pontos',
            'Opções',
          ]}
          data={
            reunioes.map(({ id, data, hora_inicio, hora_fim, ReuniaoType, Pontos }) => (
              [
                new Date(data.replace('-', '/')).toLocaleDateString(),
                hora_inicio,
                hora_fim,
                ReuniaoType.tipo,
                'Pontos',
                <ReuniaoIcons id={id} date={new Date(data.replace('-', '/'))} />,
              ]
            ))
          }
        />
      </TableContainer> */}
    </Container>
  );
};

export default Usuarios;

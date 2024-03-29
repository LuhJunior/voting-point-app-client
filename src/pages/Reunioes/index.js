import React, { useState, useEffect, useCallback } from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import { GroupRounded } from '@material-ui/icons';

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

import { getDateString } from '../../utils/date';

const Reunioes = () => {
  const [reunioes, setReunioes] = useState([]);
  const [habilitar, setHabilitar] = useState(false);

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
        const resposta = await api.get('/reuniao');
        const { data } = resposta.data;
        const res = await api.get('/reuniao/current');
        console.log(res.data);
        setHabilitar(res.data === null);
        setReunioes(data);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <Container>
      <InfoContainer>
        <IconContainer>
          <GroupRounded />
        </IconContainer>
        <Title>Reuniões</Title>
      </InfoContainer>
      {
        reunioes.map(({
          id,
          titulo,
          data,
          hora_inicio: horaInicio,
          hora_segunda_chamada: segundaChamada,
          ReuniaoType: {
            tipo,
          },
          ReuniaoStatus,
          Ponto,
        }) => (
          <InfoCard
            key={id}
            id={id}
            titulo={titulo}
            data={new Date(data.replace('-', '/')).toLocaleDateString()}
            horaInicio={horaInicio}
            segundaChamada={segundaChamada}
            tipo={tipo}
            habilitar={habilitar}
            status={ReuniaoStatus}
            pontos={Ponto}
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

export default Reunioes;

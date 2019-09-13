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

  const ReuniaoIcons = useCallback(({ id, date }) => (
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
  ), []);

  useEffect(() => {
    (async () => {
      try {
        console.log(await api.get('/voto_type'));
        const resposta = await api.get('reuniao');
        const { data } = resposta.data;
        console.log(data);
        setReunioes(data);
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
        reunioes.map(({ id, data, hora_inicio: horaInicio, hora_fim: horaFim, ReuniaoType, Pontos }) => (
          <InfoCard
            data={new Date(data.replace('-', '/')).toLocaleDateString()}
            horaInicio={horaInicio}
            horaFim={horaFim}
            ReuniaoType={ReuniaoType}
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

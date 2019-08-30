import React, { useState, useEffect } from 'react';
import { GroupRounded } from '@material-ui/icons';

import QuorumCount from './components/QuorumCount';
import Pauta from './components/Pauta';
import Votation from './components/Votation';
import InfoComponent from './components/InfoComponent';

import {
  Container,
  InfoContainer,
  IconContainer,
  Title,
} from './styles';

import { getDateString, getHourString } from '../../utils/date';

import io from 'socket.io-client';
import api from '../../services/api';

const socket = io('http://localhost:8000');

const Reuniao = () => {
  const [etapa, setEtapa] = useState('');
  const [reuniao, setReuniao] = useState(null);

  const next = (screen) => setEtapa(screen);

  socket.on('pauta', (data) => {
    console.log('mostrar pauta');
    setEtapa('pauta');
  });

  const RenderEtapa = () => {
    if (etapa === 'sem_reunião') return <InfoComponent msg="Não existe nenhuma reunião cadastrada para o dia de hoje" />;
    if (etapa === 'antes_reunião')  return <InfoComponent msg={`A Reunião começará às ${reuniao.hora_inicio} horas`} />;
    if (etapa === 'quorum') return <QuorumCount reuniaoId={reuniao.id} socket={socket} next={() => next('pauta')} />;
    if (etapa === 'pauta') return <Pauta next={() => next('votation')} />;
    if (etapa === 'votation') return <Votation />;
    return null;
  };

  useEffect(() => {
    (async () => {
      try {
        const resposta = await api.get('/reuniao/current');
        const { data } = resposta.data;
        console.log(data);
        if (data) {
          const r = data[0];
          const { hora_inicio } = r;
          if (getHourString(new Date()) > hora_inicio) {
            const resposta = await api.post('participacao', {
              chegada: getDateString(new Date()),
              reuniao_id: r.id,
            });
            // console.log(resposta);
            setReuniao(r);
            setEtapa('quorum');
            socket.emit('quorum_count');
          } else {
            setEtapa('antes_reunião');
          }
        } else {
          setEtapa('sem_reunião');
        }
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
        <Title>Reunião</Title>
      </InfoContainer>
      <RenderEtapa />
    </Container>
  );
};

export default Reuniao;

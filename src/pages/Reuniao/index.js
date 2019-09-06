import React, { useState, useEffect } from 'react';
import { GroupRounded } from '@material-ui/icons';

import StartMeeting from './components/StartMeeting';
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

import { serverUrl } from '../../utils/constants';

const socket = io(serverUrl);

const Reuniao = () => {
  const tipo = sessionStorage.getItem('@user_type');
  const [etapa, setEtapa] = useState('');
  const [reuniao, setReuniao] = useState(null);
  const [ponto, setPonto] = useState(-1);

  socket.on('quorum', () => setEtapa('quorum'));
  socket.on('start_meeting', () => {
    setEtapa('votation');
    setPonto(-1);
  });
  socket.on('next_topic', ({ ponto: pt }) => setPonto(pt));
  socket.on('end_meeting', () => setEtapa('resultado'));

  const getPonto = () => {
    if (ponto === -1) {
      return ({
        votavel: false,
        index: ponto,
        ponto: 'Informes',
        anexo: false,
      });
    }
    if (ponto < reuniao.Pontos.length) {
      return ({
        votavel: true,
        index: ponto,
        pontoId: reuniao.Pontos[ponto].id,
        ponto: reuniao.Pontos[ponto].ponto,
        anexo: false,
      });
    }
    return ({
      votavel: false,
      index: ponto,
      ponto: 'O que ocorrer',
      anexo: false,
    });
  };

  const RenderEtapa = () => {
    if (etapa === 'sem_reunião') return <InfoComponent msg="Não existe nenhuma reunião cadastrada para o dia de hoje" />;
    if (etapa === 'antes_reunião') return <InfoComponent msg={`A Reunião começará às ${reuniao.hora_inicio} horas`} />;
    if (etapa === 'criar_sala') {
      if (tipo === 'Administrador') return <StartMeeting reuniaoId={reuniao.id} socket={socket} next={() => setEtapa('quorum')} />;
      return <InfoComponent msg="Aguarde a reunião ser habilitada" />;
    }
    if (etapa === 'quorum') {
      if (tipo === 'Administrador') return <QuorumCount reuniaoId={reuniao.id} socket={socket} />;
      return <Pauta socket={socket} pontos={reuniao.Pontos} />;
    }
    /* if (etapa === 'pauta') return <Pauta next={() => next('votation')} />; */
    if (etapa === 'votation') return <Votation socket={socket} {...getPonto()} />;
    if (etapa === 'resultado') return <InfoComponent msg="Resultado da Reunião:" />;
    return null;
  };

  useEffect(() => {
    (async () => {
      try {
        const resposta = await api.get('/reuniao/current');
        const { data } = resposta.data;
        console.log(data);
        if (data && data.length > 0) {
          const r = data[0];
          const { hora_inicio } = r;
          if (getHourString(new Date()) > hora_inicio) {
            const resposta = await api.post('participacao', {
              chegada: getDateString(new Date()),
              reuniao_id: r.id,
            });
            // console.log(resposta);
            setReuniao(r);
            setEtapa('criar_sala');
            // socket.emit('quorum_count');
          } else {
            setReuniao(r);
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

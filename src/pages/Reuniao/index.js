import React, { useState, useEffect } from 'react';
import { GroupRounded } from '@material-ui/icons';
import io from 'socket.io-client';

import StartMeeting from './components/StartMeeting';
import QuorumCount from './components/QuorumCount';
import Pauta from './components/Pauta';
import Votation from './components/Votation';
import VotationResult from './components/VotationResult';
import InfoComponent from './components/InfoComponent';

import {
  Container,
  InfoContainer,
  IconContainer,
  Title,
} from './styles';

import { getDateString, getHourString } from '../../utils/date';

import api from '../../services/api';

import { serverUrl } from '../../utils/constants';

const socket = io(serverUrl);

const Reuniao = () => {
  const id = sessionStorage.getItem('@user_id');
  const tipo = sessionStorage.getItem('@user_type');
  const [etapa, setEtapa] = useState('');
  const [reuniao, setReuniao] = useState(null);
  const [ponto, setPonto] = useState(-1);

  socket.on('quorum', () => {
    if (reuniao) setEtapa('quorum');
  });

  socket.on('etapa', ({ etapa: e, ponto: p }) => {
    // console.log(data);
    setEtapa(e);
    if (e === 'votation') setPonto(p);
  });

  socket.on('start_meeting', async () => {
    setEtapa('votation');
    setPonto(-1);
    try {
      console.log(reuniao);
      await api.post('/participacao', {
        chegada: getDateString(new Date()),
        reuniao_id: reuniao.id,
      });
    } catch (e) {
      console.log(e);
    }
  });

  socket.on('next_topic', ({ ponto: pt }) => {
    setEtapa('votation');
    setPonto(pt);
  });

  socket.on('votation_result', () => setEtapa('votation_result'));

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
    if (ponto < reuniao.Ponto.length) {
      return ({
        votavel: true,
        index: ponto,
        pontoId: reuniao.Ponto[ponto].id,
        ponto: reuniao.Ponto[ponto].ponto,
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
    const userData = {
      id, tipo, socket,
    };
    if (etapa === 'sem_reunião') return <InfoComponent msg="Não existe nenhuma reunião cadastrada para o dia de hoje" />;
    if (etapa === 'antes_reunião') return <InfoComponent msg={`A Reunião começará às ${reuniao.hora_inicio} horas`} />;
    if (etapa === 'criar_sala') {
      if (tipo === 'Administrador') return <StartMeeting reuniaoId={reuniao.id} {...userData} />;
      return <InfoComponent msg="Aguarde a reunião ser habilitada" />;
    }
    if (etapa === 'quorum') {
      if (tipo === 'Administrador') return <QuorumCount reuniaoId={reuniao.id} {...userData} />;
      return <Pauta {...userData} pontos={reuniao.Ponto} />;
    }
    if (etapa === 'votation') return <Votation {...userData} {...getPonto()} />;
    if (etapa === 'votation_result') {
      return (
        <VotationResult
          {...userData}
          index={ponto}
          pontoId={reuniao.Ponto[ponto].id}
          ponto={reuniao.Ponto[ponto].ponto}
        />
      );
    }
    if (etapa === 'resultado') return <InfoComponent msg="Resultado da Reunião:" />;
    return null;
  };

  useEffect(() => {
    (async () => {
      try {
        const resposta = await api.get('/reuniao/current');
        const { data } = resposta.data;
        console.log(data);
        if (data) {
          const { id: reuniaoId, hora_inicio: horaInicio } = data;
          const res = await api.get(`/reuniao/${reuniaoId}`);
          const { data: mData } = res.data;
          if (getHourString(new Date()) > horaInicio) {
            /* const resposta = await api.post('participacao', {
              chegada: getDateString(new Date()),
              reuniao_id: r.id,
            }); */
            // console.log(resposta);
            setReuniao(mData);
            socket.emit('etapa', { id, tipo, reuniaoId });
            /* if (r.Users.length === 0) {
              setEtapa('criar_sala');
              socket.emit('check_room');
            } else if (r.Ponto[0].Users.length === 0) {
              if (tipo === 'Administrador') socket.emit('create_room', { secretaryId: id });
              if (tipo === 'Conselheiro') socket.emit('join_room', { userId: id });
              setEtapa('votation');
              setPonto(-1);
            } else {
              setEtapa('votation');
              setPonto(r.Ponto.findIndex(({ Users }) => (Users.length === 0)));
            } */
          } else {
            setReuniao(mData);
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

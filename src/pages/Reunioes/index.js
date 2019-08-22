import React, { useState, useEffect } from 'react';
import { GroupRounded } from '@material-ui/icons';

import api from '../../services/api';

import {
  Container,
  InfoContainer,
  IconContainer,
  Title,
  TableContainer,
} from './styles';

const Reunioes = () => {
  const [reunioes, setReunioes] = useState([]);


  useEffect(() => {
    (async () => {
      try {
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
      <TableContainer>
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Horário de Inicío</th>
              <th>Horário de Término</th>
              <th>Tipo</th>
              <th>Pontos</th>
            </tr>
          </thead>
          <tbody>
            {
              reunioes.map(({ id, data, hora_inicio, hora_fim, ReuniaoType, Pontos}) => (
                <tr key={id}>
                  <td>{data}</td>
                  <td>{hora_inicio}</td>
                  <td>{hora_fim}</td>
                  <td>{ReuniaoType.tipo}</td>
                  <td>Pontos</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </TableContainer>
    </Container>
  );
};

export default Reunioes;

import React, { useState, useEffect } from 'react';
import { GroupAddRounded, AddBoxRounded, CloseRounded } from '@material-ui/icons';

import Button from '../../components/Button';
import SelectInput from '../../components/SelectInput';

import { withSnackbarBottom } from '../../components/SnackbarBottom';

import { getDateString } from '../../utils/date';

import api from '../../services/api';

import {
  Container,
  Title,
  Form,
  Main,
  IconContainer,
  InputContainer,
  InputLabel,
  StyledInput,
  PlusInputContainer,
  PlusInput,
  ButtonsContainer,
  ButtonContainer,
  PontosContainer,
  PontosLine,
  PontosText,
} from './styles';

const CadastrarUser = ({ openSnackbar }) => {
  const [data, setData] = useState('');
  const [startime, setStartime] = useState('');
  const [endtime, setEndtime] = useState('');
  const [cadastrarPontos, setCadastrarPontos] = useState(false);
  const [ponto, setPonto] = useState('');
  const [pontos, setPontos] = useState([]);
  const [tipo, setTipo] = useState('');
  const [tipos, setTipos] = useState([]);

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'data') setData(value);
    else if (name === 'startime') setStartime(value);
    else if (name === 'endtime') setEndtime(value);
    else if (name === 'tipo') setTipo(value);
    else if (name === 'ponto') setPonto(value);
  };

  const errMessage = (msg) => {
    openSnackbar(msg);
    return false;
  };

  const verifyFields = () => {
    if (data === '' || startime === '' || endtime === '' || tipo === '') return errMessage('Preencha todos os campos');
    if (data < getDateString(new Date()))  return errMessage('A data não pode ser menor que a data de hoje');
    if (startime > endtime) return errMessage('O horário de término da reunião não pode ser menor que o horário de inicío');
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data, startime, endtime, tipo);
    if (verifyFields()) {
      if (!cadastrarPontos) {
        try {
          const resposta = await api.post('/reuniao', {
            data,
            hora_inicio: startime,
            hora_fim: endtime,
            reuniao_type_id: tipo,
          });
          console.log(resposta);
  
          openSnackbar('Reunião cadastrada com sucesso!');
        } catch (e) {
          openSnackbar('Ocorreu um erro ao tentar cadastrar a reunião');
          console.log(e);
        }
      } else if (pontos.length !== 0) {
        try {
          const resposta = await api.post('/reuniao', {
            data,
            hora_inicio: startime,
            hora_fim: endtime,
            reuniao_type_id: tipo,
          });

          const { id } = resposta.data.data;
          pontos.map(async (p) => {
            await api.post('/ponto', {
              ponto: p,
              reuniao_id: id,
            });
          });          
  
          openSnackbar('Reunião cadastrada com sucesso!');
        } catch (e) {
          openSnackbar('Ocorreu um erro ao tentar cadastrar a reunião');
          console.log(e);
        }
      } else {
        openSnackbar('É necessário adicionar pelomenos um ponto');
      }
    }
  };

  const handleAdicionarPontos = () => {
    setCadastrarPontos(true);
  };

  const handleAdicionarPontosDepois = () => {
    setCadastrarPontos(false);
  };

  const handleAddPonto = () => {
    if (ponto !== '') {
      setPontos([...pontos, ponto]);
      setPonto('');
    }
  };

  const Pontos = () => pontos.map((p, index) => (
    <PontosLine key={index.toString()}>
      <PontosText>{p}</PontosText>
      <CloseRounded onClick={() => setPontos(pontos.filter((value, i) => i !== index))} />
    </PontosLine>
  ));

  const Tipos = () => tipos.map(({ id, tipo }) => (<option key={id} value={id}>{tipo}</option>));

  useEffect(() => {
    (async () => {
      try {
        const resposta = await api.get('/reuniao_type');
        const { data } = resposta.data;
        setTipos(data);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <Container>
      <Main>
        <IconContainer>
          <GroupAddRounded />
        </IconContainer>
        <Title>Cadastrar Reunião</Title>
        <Form>
          <InputContainer>
            <InputLabel>Data</InputLabel>
            <StyledInput 
              name="data"
              type="date"
              value={data}
              onChange={handleChange}
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>Horário de Inicío</InputLabel>
            <StyledInput 
              name="startime"
              type="time"
              value={startime}
              onChange={handleChange}
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>Horário de Término</InputLabel>
            <StyledInput 
              name="endtime"
              type="time"
              value={endtime}
              onChange={handleChange}
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>Tipo de reunião</InputLabel>
            <SelectInput 
              name="tipo"
              value={tipo}
              onChange={handleChange}
            >
              <option value="">  --- Escolha um Tipo --- </option>
              <Tipos />
            </SelectInput>
          </InputContainer>
          {
            cadastrarPontos ? (
              <>
                <InputContainer>
                  <InputLabel>Pontos</InputLabel>
                    <PontosContainer>
                      <Pontos />
                    </PontosContainer>
                    <PlusInputContainer>
                      <PlusInput 
                        name="ponto"
                        type="text"
                        value={ponto}
                        onChange={handleChange}
                      />
                      <AddBoxRounded onClick={handleAddPonto} />
                    </PlusInputContainer>
                </InputContainer>
                <ButtonsContainer>
                  <ButtonContainer>
                    <Button onClick={handleAdicionarPontosDepois}>
                      Adicionar Pontos Depois
                    </Button>
                  </ButtonContainer>
                  <ButtonContainer>
                    <Button onClick={handleSubmit}>
                      Cadastrar
                    </Button>
                  </ButtonContainer>
                </ButtonsContainer>
              </>
            ) : (
              <ButtonsContainer>
                <ButtonContainer>
                  <Button onClick={handleAdicionarPontos}>
                    Adicionar Pontos
                  </Button>
                </ButtonContainer>
                <ButtonContainer>
                  <Button onClick={handleSubmit}>
                    Cadastrar Sem Pontos
                  </Button>
                </ButtonContainer>
              </ButtonsContainer>
            )
          }
        </Form>
      </Main>
    </Container>
  );
};

export default withSnackbarBottom(CadastrarUser);

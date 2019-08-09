import React, { useState, useEffect } from 'react';
import { GroupAddRounded, AddBoxRounded, CloseRounded } from '@material-ui/icons';

import Button from '../../components/Button';
import SelectInput from '../../components/SelectInput';

import { withSnackbarBottom } from '../../components/SnackbarBottom';

import api from '../../services/api';

import {
  Container,
  Label,
  Form,
  Main,
  IconContainer,
  InputContainer,
  InputLabel,
  StyledInput,
  PlusInputContainer,
  PlusInput,
  ButtonContainer,
  PontosContainer,
  PontosLine,
  PontosText,
} from './styles';

const CadastrarUser = ({ openSnackbar }) => {
  const [data, setData] = useState('');
  const [ponto, setPonto] = useState('');
  const [pontos, setPontos] = useState([]);
  const [tipo, setTipo] = useState('');
  const [tipos, setTipos] = useState([]);

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'data') setData(value);
    else if (name === 'tipo') setTipo(value);
    else if (name === 'ponto') setPonto(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 /*    console.log(nome, matricula, senha, tipo);
    if (nome !== '' && matricula !== '' && senha != '' && tipo !== '') {
      try {
        const resposta = await api.post('/users', {
          nome,
          matricula,
          senha,
          user_type_id: tipo,
        });
        setTipo('');
        openSnackbar('Usuário cadastrado com sucesso!');
      } catch (e) {
        openSnackbar('Ocorreu um erro ao tentar cadastrar a reunião');
        console.log(e);
      }
    } else {
      openSnackbar('Preencha todos os campos');
    } */
  };

  const handleAddPonto = () => {
    setPontos([...pontos, ponto]);
    setPonto('');
  };

  const Pontos = () => pontos.map((p, index) => (
    <PontosLine>
      <PontosText key={index.toString()}>{p}</PontosText>
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
        <Label>Cadastrar Reunião</Label>
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
          <ButtonContainer>
            <Button onClick={handleSubmit}>
              CADASTRAR
            </Button>
          </ButtonContainer>
        </Form>
      </Main>
    </Container>
  );
};

export default withSnackbarBottom(CadastrarUser);

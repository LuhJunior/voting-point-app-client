import React, { useState, useEffect } from 'react';
import { PersonAddRounded } from '@material-ui/icons';

import Button from '../../components/Button';
import SelectInput from '../../components/SelectInput';

import { withSnackbarBottom } from '../../components/SnackbarBottom';

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
  ButtonContainer,
} from './styles';

const CadastrarUser = ({ openSnackbar }) => {
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('');
  const [tipos, setTipos] = useState([]);

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'nome') setNome(value);
    else if (name === 'matricula') setMatricula(value);
    else if (name === 'senha') setSenha(value);
    else if (name === 'tipo') setTipo(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nome !== '' && matricula !== '' && senha !== '' && tipo !== '') {
      try {
        const resposta = await api.post('/users', {
          nome,
          matricula,
          senha,
          user_type_id: tipo,
        });
        setNome('');
        setMatricula('');
        setSenha('');
        setTipo('');
        openSnackbar('Usuário cadastrado com sucesso!');
      } catch (e) {
        openSnackbar('Ocorreu um erro ao tentar cadastrar o usuário');
        console.log(e);
      }
    } else {
      openSnackbar('Preencha todos os campos');
    }
  };

  const Tipos = () => tipos.map(({ id, tipo }) => (<option key={id} value={id}>{tipo}</option>));

  useEffect(() => {
    (async () => {
      try {
        const resposta = await api.get('/user_type');
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
          <PersonAddRounded />
        </IconContainer>
        <Title>Cadastrar Usuário</Title>
        <Form>
          <InputContainer>
            <InputLabel>Nome</InputLabel>
            <StyledInput 
              name="nome"
              type="text"
              value={nome}
              onChange={handleChange}
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>Matricula</InputLabel>
            <StyledInput 
              name="matricula"
              type="text"
              value={matricula}
              onChange={handleChange}
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>Senha</InputLabel>
            <StyledInput 
              name="senha"
              type="password"
              value={senha}
              onChange={handleChange}
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>Tipo de usuário</InputLabel>
            <SelectInput 
              name="tipo"
              value={tipo}
              onChange={handleChange}
            >
              <option value="">  --- Escolha um Tipo --- </option>
              <Tipos />
            </SelectInput>
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

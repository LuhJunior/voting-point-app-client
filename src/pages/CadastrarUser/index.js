import React, { useState } from 'react';
import { PersonRounded } from '@material-ui/icons';

import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';

import {
  Container,
  Label,
  Form,
  Main,
  InputContainer,
  InputLabel,
  StyledInput,
  ButtonContainer,
} from './styles';

const CadastrarUser = () => {
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState(0);

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'nome') setNome(value);
    else if (name === 'matricula') setMatricula(value);
    else if (name === 'senha') setSenha(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(nome, matricula);
  };

  return (
    <Container>
      <Main>
        <Label>Cadastrar Usuário</Label>
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

export default CadastrarUser;

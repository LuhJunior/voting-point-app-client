import React from 'react';
import {
  HomeRounded,
  PersonRounded,
  PersonAddRounded,
  PersonOutlineRounded,
  GroupRounded,
  GroupAddRounded,
  PeopleOutlineRounded,
  ExitToAppRounded,
} from '@material-ui/icons';
import { withRouter } from 'react-router-dom';

import Nav from '../../../../components/Nav';
import NavItem from '../../../../components/NavItem';
import NavDropDown from '../../../../components/NavDropDown';

import {
  Container,
  InfoContainer,
  Span,
  Bar,
  IconContainer,
} from './styles';


const Navbar = ({ history }) => {
  const nome = sessionStorage.getItem('@user_name');
  const tipo = sessionStorage.getItem('@user_type');

  const logout = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    history.push('/');
  }

  const NavIcon = ({ icon: Icon }) => (
    <IconContainer>
      <Icon />
    </IconContainer>
  );

  return (
    <Container>
      <InfoContainer>
        <Span>Olá, {nome}</Span>
      </InfoContainer>
      <Bar />
      <Nav>
        <NavItem to="/home">
          <NavIcon icon={HomeRounded} />
          Home
        </NavItem>
        {
          tipo === 'Administrador' ? (
            <>
              <NavDropDown title="Usuário" icon={PersonRounded}>
                <NavItem to="/cadastrar_usuario">
                  <NavIcon icon={PersonAddRounded} />
                  Cadastrar Usuário
                </NavItem>
                <NavItem to="/usuarios">
                  <NavIcon icon={PersonOutlineRounded} />
                  Usuários
                </NavItem>
              </NavDropDown>
            </>
          ) : null
        }
        <NavDropDown title="Reunião" icon={GroupRounded}>
          {
            tipo === 'Administrador' ? (
              <NavItem to="/cadastrar_reuniao">
                <NavIcon icon={GroupAddRounded} />
                Cadastrar Reunião
              </NavItem>
            ) : null
          }
          <NavItem to="/reunioes">
            <NavIcon icon={PeopleOutlineRounded} />
            Reuniões
          </NavItem>
          <NavItem to="/reuniao">Reunião</NavItem>
        </NavDropDown>
        <NavItem onClick={logout}>
          <NavIcon icon={ExitToAppRounded} />
          Sair
        </NavItem>
      </Nav>
    </Container>
  );
}

export default withRouter(Navbar);

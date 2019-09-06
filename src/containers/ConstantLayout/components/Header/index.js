import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { IconButton, Modal } from '@material-ui/core';
import { NotificationsRounded, NotificationsActiveRounded, MenuRounded } from '@material-ui/icons';

import NavBar from '../Navbar';

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  background-image: linear-gradient(to right, #c16466, #945466);

  svg {
    color: white;
    padding: 15px;
    cursor: pointer;
  }
`;

const MenuIcon = styled(MenuRounded)`
  visibility: hidden;

  @media(max-width: 850px) {
    visibility: visible;
  }
`;

const ModalContainer = styled.div`
  display: flex;
  width: 30%;
  height: 100%;
  min-width: 200px;
`;

const ButtonContainer = styled(IconButton)`
  padding: 0px !important;
`;

const Header = () => {
  const [open, setOpen] = useState(false);
  const [modalOn, setModalOn] = useState(false);
  // const [notifications, setNotifications] = useState([]);

  const dropdown = open ? (
    <div></div>
  ) : null;

  const modal = useCallback( modalOn ? (
    <Modal
      open
      onClose={() => setModalOn(false)}
    >
      <ModalContainer>
        <NavBar />
      </ModalContainer>
    </Modal>
  ) : null);


  return (
    <Container>
      <ButtonContainer onClick={() => setModalOn(true)}>
        <MenuIcon />
      </ButtonContainer>
      <ButtonContainer onClick={() => setOpen(true)}>
        <NotificationsRounded />
      </ButtonContainer>
      { modal }
    </Container>
  );
}

export default Header;
import React, { useState } from 'react';
import styled from 'styled-components';
import { NotificationsRounded, NotificationsActiveRounded, MenuRounded } from '@material-ui/icons';

import './style.css';

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

const Header = () => {
  const [open, setOpen] = useState(false);
  // const [notifications, setNotifications] = useState([]);

  const dropdown = open ? (
    <div></div>
  ) : null;

  return (
    <Container>
      <MenuIcon />
      <NotificationsRounded onClick={() => setOpen(true)} />
    </Container>
  );
}

export default Header;
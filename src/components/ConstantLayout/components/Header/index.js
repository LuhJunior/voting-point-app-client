import React, { useState } from 'react';
import { NotificationsRounded, NotificationsActiveRounded, MenuRounded } from '@material-ui/icons';

import './style.css';

const Header = () => {
  const [open, setOpen] = useState(false);
  // const [notifications, setNotifications] = useState([]);

  const dropdown = open ? (
    <div></div>
  ) : null;

  return (
    <div className="header-container">
      <MenuRounded className="menu-drop-down" />
      <NotificationsRounded onClick={() => setOpen(true)} />
      { dropdown }
    </div>
  );
}

export default Header;
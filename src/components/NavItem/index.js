import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const Item = styled.a`
  display: flex;
  align-items: center;
  color: white;
  background-color: ${({ on }) => on ? '#FF9800' : 'transparent'};
  font-style: normal;
  text-decoration: none;
  padding: 12px;
  font-family: 'Helvetica';
  font-size: 14px;
  font-weight: 700;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  cursor: pointer;

  :hover {
    background-color: #e67066;
  }
`;

const NavItem = ({ to, icon: Icon, history, ...props }) => {
  const { location: { pathname } } = history;
  const handleClick = (e) => {
    e.preventDefault();
    history.push(to);
  };
  return <Item on={to === pathname} onClick={handleClick} {...props} />;
};

export default withRouter(NavItem);

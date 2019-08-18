import React, { useState } from 'react';
import { ArrowDropDownRounded, ArrowDropUpRounded  } from '@material-ui/icons';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  a {
    font-size: 13px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  position: relative;
  padding: 12px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  align-items: center;
  cursor: pointer;

  :hover {
    background-color: #e67066;
  }
`;

const ArrowContainer = styled.div`
  position: absolute;
  right: 10px;
  color: white;
  height: 30px;
  width: 30px;
  svg {
    color: white;
    height: 30px;
    width: 30px;
  }
`;

const NavItemsContainer = styled.div`
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  cursor: pointer;

  a {
    display: flex;
    padding-left: 30px;
  }
`;

const Title = styled.span`
  color: white;
  font-style: normal;
  font-family: 'Helvetica';
  font-size: 14px;
  font-weight: 700;
`;

export const IconContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 30px;

  svg {
    position: absolute;
    color: white;
  }
`;

const NavDropDown = ({ title, icon: Icon, children }) => {
  const [open, setOpen] = useState(false);

  const ArrowDrop = () =>  (
    <ArrowContainer>
      {open ? <ArrowDropUpRounded /> : <ArrowDropDownRounded />}
    </ArrowContainer>
  );

  const NavDrop = () => (open ? (
    <NavItemsContainer>
      { children }
    </NavItemsContainer>
  ) : null);
  // console.log(NavItems)

  return (
    <Container>
      <TitleContainer onClick={() => setOpen(!open)}>
        {
          Icon ?  (
            <IconContainer>
              <Icon />
            </IconContainer>
          ) : null
        }
        <Title>{title}</Title>
        <ArrowDrop />
      </TitleContainer>
      <NavDrop />
    </Container>
  );
}

export default NavDropDown;
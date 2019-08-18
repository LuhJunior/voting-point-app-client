import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  width: 98%;
  font-size: 17px;
  font-family: Helvetica;
  padding: 1%;
  height: 40px;
  border: none;
  border-radius: 4px;
  color: #333333;
  box-shadow: inset 1px 1px 4px #777777;

  :focus {
    outline: none;
    box-shadow: 0 0 5px #aaa !important;
  }
`;

const InputIconContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  align-items: center;
  svg {
    position: absolute;
    align-items: center;
    justify-content: center;
    padding: 6px;
    color: #888888;
    width: 38px;
    height: 38px;
  }
`;

const IconInput = styled.input`
  width: 100%;
  font-size: 17px;
  font-family: Helvetica;
  padding: 4px 4px 4px 55px;
  height: 40px;
  border: none;
  border-radius: 4px;
  color: #333333;
  box-shadow: inset 1px 1px 4px #777777;
  :focus {
    outline: none;
    box-shadow: 0 0 5px #aaa !important;
  }
`;

export default ({ Icon, ...props}) => Icon ? (
  <InputIconContainer>
    <Icon />
    <IconInput {...props} />
  </InputIconContainer>
) : (
  <Input {...props} />
);

import * as React from "react";
import styled, { css } from "styled-components";

export const Dots = styled.div`
  display: flex;
  justify-content: center;
  span {
    display: block;
    cursor: pointer;
    width: 12px;
    height: 12px;
    background-color: #c2c2c2;
    border-radius: 50%;
    margin: 0 5px;
    &:hover {
      background: red;
    }
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
`;
import styled from "styled-components";
import {
  colordarkBlue800,
  colordarkGray200,
  colordarkGray300,
  colordarkGray400,
  colorlightGray100,
  colorCheck,
  colorlightGray500,
  colorlightGray200,
} from "../assets/styles";
import CheckIcon from "../assets/images/icon-check.svg";

export const Item = styled.div<{done: boolean; theme: 'dark' | 'light';}>`
  padding: 0 20px;
  background-color: ${props => props.theme === 'dark' ? colordarkBlue800 : colorlightGray100};
  height:56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${props => props.theme === 'dark' ? colordarkGray400 : colorlightGray200};
  color: ${props => props.theme === 'dark' ? colordarkGray200 : colorlightGray500};
  position: relative;
  transition: all ease 300ms;

  input[type="checkbox"] {
    display: none;
  }

  label {
    position: relative;
    cursor: pointer;

    &::before {
      content: "";
      -webkit-appearance: none;
      border: 1px solid ${colordarkGray300};
      border-radius: 50%;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
        inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
      width: 24px;
      height: 24px;
      display: inline-block;
      position: relative;
      vertical-align: middle;
      cursor: pointer;
      background: ${(props) => (props.done ? colorCheck : "")};
    }

    &:after {
      content: "";
      display: ${(props) => (props.done ? "block" : "none")};
      position: absolute;
      top: 10px;
      left: 7px;
      width: 10px;
      height: 10px;
      background: url(${CheckIcon}) no-repeat;
    }
  }

  span {
    display:inline-block;
    max-width: 370px;
    margin-left: 20px;
    text-decoration: ${(props) => (props.done ? "line-through" : "")};
    color: ${(props) => (props.done ? colordarkGray300 : "inherit")};
  }

  .delete {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
`;

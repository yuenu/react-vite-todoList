import styled from "styled-components";
import {
  colordarkBlue800,
  colordarkGray200,
  colordarkGray300,
  colordarkGray400,
  colorCheck,
} from "../assets/styles";
import CheckIcon from "../assets/images/icon-check.svg";

export interface ItemProps {
  done: boolean;
}

export const Item = styled.div<ItemProps>`
  padding: 14px 20px;
  background-color: ${colordarkBlue800};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${colordarkGray400};
  color: ${colordarkGray200};
  position: relative;

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
      top: 7px;
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
  }
`;

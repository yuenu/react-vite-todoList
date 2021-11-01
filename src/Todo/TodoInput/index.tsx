import React, { useState } from "react";
import { Item } from "../../components/Item";
import styled from "styled-components";
import { colordarkGray200 } from "../../assets/styles";

const InputSection = styled(Item)`
  margin-bottom: 20px;
  border: 0;

  input[type="text"] {
    width: 100%;
    margin-left: 20px;
    margin-right: 40px;
    font-size:18px;
    background-color: transparent;
    color: ${colordarkGray200};
    border: 0;
    outline:0;
  }
`;

const TodoInput = () => {
  const [userInput, setUserInput] = useState("");
  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  return (
    <InputSection done={false}>
      <div>
        <input type="checkbox" id="todoInput" />
        <label htmlFor="todoInput"> </label>
      </div>
      <input type="text" value={userInput} onChange={inputHandler} />
    </InputSection>
  );
};

export default TodoInput;

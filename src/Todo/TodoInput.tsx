import React, { useState } from "react";
import { Item } from "../components/Item";
import styled from "styled-components";
import { colordarkGray200, colordarkGray300 } from "../assets/styles";
import { addTodo, removeTodo } from "../store";
import { useDispatch } from "react-redux";

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

    &::placeholder {
      color: ${colordarkGray300};
    }
  }
`;


const TodoInput = () => {
  const dispatch = useDispatch()

  const [userInput, setUserInput] = useState('');
  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const submitHandler = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault()
    dispatch(addTodo({ text: userInput, done: false }))
    setUserInput('')
  }

  return (
    <form onSubmit={submitHandler}>
      <InputSection done={false}>
        <div>
          <input type="checkbox" id="todoInput" />
          <label htmlFor="todoInput"> </label>
        </div>
        <input type="text" value={userInput} onChange={inputHandler} placeholder="Text your TODO" />
      </InputSection>
    </form>
  );
};

export default TodoInput;

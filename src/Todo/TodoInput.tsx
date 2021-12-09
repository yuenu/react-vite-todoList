import React, { useState } from "react";
import { Item } from "../components/Item";
import styled from "styled-components";
import { colordarkGray200, colordarkGray300 } from "../assets/styles";
import { addTodo, removeTodo } from "../store";
import { useDispatch } from "react-redux";

const InputSection = styled(Item)`
  margin-bottom: 20px;
  border: 0;
`;

const TextInput = styled.input`
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
`


const TodoInput = () => {
  const dispatch = useDispatch()

  const [input, setInput] = useState('');
  const [check, setCheck] = useState(false)

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const submitHandler = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault()
    dispatch(addTodo({ text: input, done: check })),
    setInput('')
  }

  const stateHandler = () => {
    setCheck((prevState) => !prevState);
  };

  return (
    <form onSubmit={submitHandler}>
      <InputSection done={check}>
        <div>
          <input type="checkbox" id="todoInput" />
          <label htmlFor="todoInput" onClick={stateHandler}></label>
        </div>
        <TextInput type="text" value={input} onChange={inputHandler} placeholder="Text your todo item" />
      </InputSection>
    </form>
  );
};

export default TodoInput;

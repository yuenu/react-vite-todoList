import React, { useState } from "react";
import { Item } from "../components/Item";
import styled from "styled-components";
import { colordarkGray200, colordarkGray300 } from "../assets/styles";
import { addTodo, removeTodo } from "../store";
import { useDispatch } from "react-redux";

const InputSection = styled(Item)`
  margin-bottom: 20px;
  border: 0;
  border-radius: 3px;
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

const Label = styled.label`
  width:100%;
`

type Props = {
  theme: 'dark' | 'light'
}


const TodoInput: React.FC<Props> = ({ theme }) => {
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
      <InputSection done={check} theme={theme}>
        <div>
          <input type="checkbox" id="todoInput" />
          <Label htmlFor="todoInput" onClick={stateHandler}></Label>
        </div>
        <TextInput type="text" value={input} onChange={inputHandler} placeholder="Text your todo item" />
      </InputSection>
    </form>
  );
};

export default TodoInput;

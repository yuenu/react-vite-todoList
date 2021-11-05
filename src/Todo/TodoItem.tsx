import { Item } from "../components/Item";
import { useLayoutEffect, useRef, useState } from "react";
import Icon from '../components/Icon'
import { useDispatch } from "react-redux";
import { getAllTodos, removeTodo } from "../store";

type PropsType = {
  id: number;
  text: string;
  done: boolean;
};

const TodoItem = ({ text, done, id }: PropsType) => {
  const dispatch = useDispatch()
  const [check, setCheck] = useState(done);
  const inputRef = useRef<HTMLInputElement>(null)

  useLayoutEffect(() => {
    if(inputRef.current !== null) inputRef.current.checked = done
  })
  const stateHandler = () => {
    setCheck((prevState) => !prevState);
  };

  const removeTodoHandler = (id: number) => {
    dispatch(removeTodo({id}))
    dispatch(getAllTodos())
  }

  return (
    <Item done={check}>
      <div className="item__container">
        <input type="checkbox" id={`item${id}`} ref={inputRef} />
        <label htmlFor={`item${id}`} onClick={stateHandler}>
          <span>{text}</span>
        </label>
      </div>
      <div onClick={() => removeTodoHandler(id)}>
        <Icon.Cross className="delete"  />
      </div>
    </Item>
  );
};

export default TodoItem;

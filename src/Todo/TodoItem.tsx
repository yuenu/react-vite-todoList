import { Item } from "../components/Item";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Icon from '../components/Icon'
import { useDispatch } from "react-redux";
import { getAllTodos, removeTodo } from "../store";
import useTimeout from '../hooks/useTimeout'

type PropsType = {
  id: number;
  text: string;
  done: boolean;
};

type callbackFn = () => void
// type DoubleClickCallbackFn = (event: React.MouseEvent<HTMLSpanElement>) => void

function useSingleAndDoubleClick(actionSimpleClick: callbackFn, actionDoubleClick: callbackFn, delay = 250 ) {
  const [click, setClick] = useState(0);

  useEffect(() => {
      const timer = setTimeout(() => {
          // simple click
          if (click === 1) actionSimpleClick();
          setClick(0);
      }, delay);

      // the duration between this click and the previous one
      // is less than the value of delay = double-click
      if (click === 2) actionDoubleClick();

      return () => clearTimeout(timer);
      
  }, [click]);

  return () => setClick(prev => prev + 1);
}

const TodoItem = ({ text, done, id }: PropsType) => {
  const dispatch = useDispatch()
  const [check, setCheck] = useState(done);
  const inputRef = useRef<HTMLInputElement>(null)

  useLayoutEffect(() => {
    if(inputRef.current !== null) inputRef.current.checked = done
  })

  const onSingleClickHandler = () => {
    setCheck((prevState) => !prevState);
  };

  // const onDoubleClickHandler = (event: React.MouseEvent<HTMLSpanElement>) => {
  //   console.log('change to edit mode', event)
  // }

  const onDoubleClickHandler = () => {
    console.log('change to edit mode')
  }

  const removeTodoHandler = (id: number) => {
    dispatch(removeTodo({id}))
    dispatch(getAllTodos())
  }

  const clickHandler = useSingleAndDoubleClick(onSingleClickHandler, onDoubleClickHandler)

  return (
    <Item done={check}>
      <div className="item__container">
        <input type="checkbox" id={`item${id}`} ref={inputRef} />
        <label htmlFor={`item${id}`} onClick={clickHandler} >
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

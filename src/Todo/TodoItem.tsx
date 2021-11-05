import { Item } from "../components/Item";
import { useLayoutEffect, useRef, useState } from "react";

type PropsType = {
  id?: number;
  text: string;
  done: boolean;
};

const TodoItem = ({ text, done, id }: PropsType) => {
  const [check, setCheck] = useState(done);
  const inputRef = useRef<HTMLInputElement>(null)

  useLayoutEffect(() => {
    if(inputRef.current !== null) inputRef.current.checked = done
  })
  const stateHandler = () => {
    setCheck((prevState) => !prevState);
  };

  return (
    <Item done={check}>
      <div>
        <input type="checkbox" id={`item${id}`} ref={inputRef} />
        <label htmlFor={`item${id}`} onClick={stateHandler}>
          <span>{text}</span>
        </label>
      </div>
    </Item>
  );
};

export default TodoItem;

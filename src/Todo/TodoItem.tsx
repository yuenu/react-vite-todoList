import { Item } from "../components/Item";
import { useState } from "react";

type PropsType = {
  id: number;
  text: string;
  done: boolean;
};

const TodoItem = ({ text, done, id }: PropsType) => {
  const [check, setCheck] = useState(done);

  const stateHandler = () => {
    setCheck((prevState) => !prevState);
  };

  return (
    <Item done={check}>
      <div>
        <input type="checkbox" id={`item${id}`} checked={check} />
        <label htmlFor={`item${id}`} onClick={stateHandler}>
          <span>{text}</span>
        </label>
      </div>
    </Item>
  );
};

export default TodoItem;

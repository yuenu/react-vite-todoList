import styled from "styled-components"
import { colordarkBlue800, colordarkGray200, colordarkGray300, colordarkGray400, colorCheck } from "../../assets/styles"
import CheckIcon from '../../assets/images/icon-check.svg'
import { useState } from "react"

interface ItemProps {
  done: boolean
}

const Item = styled.div<ItemProps>`
  padding: 16px 24px;
  background-color: ${colordarkBlue800};
  display:flex;
  align-items: center;
  border-bottom: 1px solid ${colordarkGray400};
  color: ${colordarkGray200};
  position:relative;

  input {
    display: none;
  }

  label {
    position: relative;
    cursor: pointer;

    &::before {
      content: "";
      -webkit-appearance: none;
      border: 1px solid ${colordarkGray300};
      border-radius:50%;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
      width:24px;
      height:24px;
      display: inline-block;
      position: relative;
      vertical-align: middle;
      cursor: pointer;
      background: ${props => props.done ? colorCheck : ''}
    }
  
    &:after {
      content: "";
      display: ${props => props.done ? 'block' : 'none'};
      position: absolute;
      top:7px;
      left:7px;
      width:10px;
      height:10px;
      background: url(${CheckIcon}) no-repeat;
    }
  }

  span {
    margin-left: 20px;
    text-decoration: ${props => props.done ? 'line-through' : ''};
    color: ${props => props.done ? colordarkGray300 : 'inherit'};
  }
`

type PropsType = {
  id: number
  text: string,
  done: boolean
}

const TodoItem = ({ text, done, id }: PropsType) => {
  const [check, setCheck] = useState(done)

  const stateHandler = () => {
    setCheck((prevState) => !prevState)
  }

  return (
    <Item done={check}>
      <div>
        
        <input type="checkbox" id={`item${id}`} checked={check} />
        <label htmlFor={`item${id}`} onClick={stateHandler}>
          <span>{text}</span>
        </label>
      </div>
      
    </Item>
  )
}

export default TodoItem
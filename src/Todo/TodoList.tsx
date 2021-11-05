import TodoItem from "./TodoItem"
import styled from "styled-components"
import { useSelector } from "react-redux"
import { RootState } from '../store'

const List = styled.div`
  border-radius: 4px;
`

const TodoList = () => {
  const state = useSelector((state: RootState) => state.todos)
  return (
    <List>
      {state.map((data) => {
        return <TodoItem key={data.id} text={data.text} done={data.done} id={data.id} ></TodoItem>
      })}
    </List>
  )
}

export default TodoList
import TodoItem from "./TodoItem"
import styled from "styled-components"
import { TodoType } from '../store'

const List = styled.div`
  border-radius: 4px;
  overflow: auto;
  max-height:336px;
`
interface PropsType {
  todos: TodoType[]
}

const TodoList = (props: PropsType) => {
  return (
    <List>
      {props.todos.map((todo) => {
        return <TodoItem key={todo.id} {...todo} ></TodoItem>
      })}
    </List>
  )
}

export default TodoList
import TodoItem from "./TodoItem"
import styled from "styled-components"
import { TodoType } from '../store'
import { Droppable } from 'react-beautiful-dnd'


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
    <Droppable droppableId={props.todos.length.toString()}>
      {(provider, snapshot) => 
        <List
          ref={provider.innerRef}
          {...provider.droppableProps}
          // isDraggingOver={snapshot.isDraggingOver}
        >
          {props.todos.map((todo, index) => {
            return <TodoItem key={todo.id} {...todo} index={index} ></TodoItem>
          })}
        </List>
      }
    </Droppable>
  )
}

export default TodoList
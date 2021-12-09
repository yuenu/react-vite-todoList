import TodoItem from "./TodoItem"
import styled from "styled-components"
import { TodoType } from '../store'
import { Droppable } from 'react-beautiful-dnd'
import { useEffect, useState } from "react"


const List = styled.div`
  border-radius: 3px 3px 0 0;
  overflow: auto;
  max-height:336px;
`
interface PropsType {
  todos: TodoType[]
  stateStatus: 'all' | 'active' | 'completed'
}

const TodoList = ({ todos, stateStatus }: PropsType) => {
  const [renderTodos, setRenderTodos] = useState<TodoType[]>(todos)

  useEffect(() => {
    switch (stateStatus) {
      case 'all':
        setRenderTodos(todos)
        break
      case 'active':
        setRenderTodos(todos.filter((item) => item.done === false))
        break
      case 'completed':
        setRenderTodos(todos.filter((item) => item.done === true))
        break
    }
  }, [todos, stateStatus])

  return (
    <Droppable droppableId="list">
      {(provider, snapshot) =>
        <List
          ref={provider.innerRef}
          {...provider.droppableProps}
        // isDraggingOver={snapshot.isDraggingOver}
        >
          {renderTodos.map((todo, index) => {
            return <TodoItem key={todo.id} {...todo} index={index} ></TodoItem>
          })}
          {provider.placeholder}
        </List>
      }
    </Droppable>
  )
}

export default TodoList
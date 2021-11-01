import TodoItem from "../TodoItem"
import styled from "styled-components"

const dummy_data = [
  {
    id: 1,
    text: 'Complete online JavaScript course',
    done: true
  },
  {
    id: 2,
    text: 'Jog aroung the park 3x',
    done: false
  },
  {
    id: 3,
    text: '10 minutes meditation',
    done: false
  },
  {
    id: 4,
    text: 'Read for 1 hour',
    done: false
  },
  {
    id: 5,
    text: 'Pick up groceries',
    done: false
  },
  {
    id: 6,
    text: 'Complete Todo App on Frontend Mentor',
    done: false
  },
]

const List = styled.div`
  border-radius: 4px;
`

const TodoList = () => {
  return (
    <List>
      {dummy_data.map((data) => {
      return <TodoItem key={data.id} text={data.text} done={data.done} id={data.id} ></TodoItem>
    })}
    </List>
  )
}

export default TodoList
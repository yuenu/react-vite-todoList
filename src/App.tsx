import React, { useState } from 'react'
import styled from 'styled-components'
import {
  colordarkBlue800,
  colordarkGray100,
  colordarkGray200,
  colordarkGray300,
  colorlightGray400,
  colorPrimary,
  GlobalStyles
} from './assets/styles'
import { colordarkBlue900 } from './assets/styles'
import Icon from './components/Icon'
import Bg from './assets/images/bg-desktop-dark.jpg'
import TodoList from './Todo/TodoList'
import TodoInput from './Todo/TodoInput'
import { useDispatch, useSelector } from 'react-redux'
import { clearCompleted, RootState, updatedAllTodos} from './store'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'


// STYLES
const Container = styled.div`
  background-color: ${colordarkBlue900};
  color: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media(max-width:550px) {
    padding: 0 20px;
  }
`

const Background = styled.div`
  background: url(${Bg});
  height: 30vh;
  width: 100%;
  object-fit: cover;
  position: fixed;
  top: 0;
  left: 0;
`

const Main = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width:100%;
  margin-top: 5vh;
  z-index: 1;
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 6px;
  font-weight:400;
  margin-bottom:2rem;
`

const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${colorlightGray400};
  background-color: ${colordarkBlue800};
  padding:10px 20px;

  p {
    font-size: 14px;
  }
`

const StateControl = styled.div`
  display: flex;
  gap: 8px;

  button {
    background-color: transparent;
    border:0;
    color: inherit;
    font-family: inherit;
    cursor: pointer;

    &:hover {
      color: ${colordarkGray100};
    }

    &.active {
      color: ${colorPrimary};
    }
  }
`

const ClearButton = styled.button`
  background: transparent;
  color: inherit;
  border:0;
  font-family: inherit;
  cursor: pointer;

  &:hover {
    color: ${colordarkGray200};
  }
`

const Tips = styled.p`
  font-size:14px;
  margin-top:40px;
  text-align: center;
  color: ${colordarkGray300};
`

const Footer = styled.footer`
  font-size: 11px; 
  text-align: center;

  a {
    color: hsl(228, 45%, 44%);
  }
`
const ThemeContext = React.createContext('light')

const App = () => {
  const dispatch = useDispatch()
  const todos = useSelector((state: RootState) => state.todosSlice.todos)
  const visiableTodos = useSelector((state: RootState) => state.todosSlice.visiableTodos)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [stateStatus, setStateStatus] = useState<'all' | 'active' | 'completed'>('all')

  const changeTheme = () => {
    setTheme((preState) => {
      if (preState === 'dark') return 'light'
      return 'dark'
    })

    console.log('change theme')
  }

  const onDragEndHandler = (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination) return;
    if (destination.droppableId === source.droppableId &&
      destination.index === source.index) return;

    const draggedItem = Array.from(todos).filter((todo) => {
      return todo.id === parseInt(draggableId, 10)
    })[0]
    
    const newTodos = Array.from(todos)
    newTodos.splice(source.index, 1)
    newTodos.splice(destination.index, 0, draggedItem)
    
    dispatch(updatedAllTodos(newTodos))
  }

  return (
    <>
    <GlobalStyles></GlobalStyles>
    <ThemeContext.Provider value="dark">
        <DragDropContext onDragEnd={onDragEndHandler}>
          <Container>
            <Background />
            <Main>
              <Header>
                <h1>Todo</h1>
                <Icon.Sun onClick={changeTheme} />
              </Header>

              <TodoInput></TodoInput>

              <TodoList todos={todos} stateStatus={stateStatus}></TodoList>

              <FilterSection>
                <p>{todos.length} items left</p>
                <StateControl>
                  <button className={stateStatus === 'all' ? 'active' : ''} onClick={() => setStateStatus('all')} >All</button>
                  <button className={stateStatus === 'active' ? 'active' : ''} onClick={() => setStateStatus('active')}>Active</button>
                  <button className={stateStatus === 'completed' ? 'active' : ''} onClick={() => setStateStatus('completed')}>Completed</button>
                </StateControl>
                <ClearButton onClick={() => dispatch(clearCompleted())}>Clear Completed</ClearButton>
              </FilterSection>

              <Tips>Drag and drop to reorder list</Tips>
            </Main>

            <Footer className="attribution">
              Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.
              Coded by <a href="https://github.com/yuenu">yuenu</a>.
            </Footer>
          </Container>
        </DragDropContext>
      </ThemeContext.Provider>
    </>
  )
}


export default App
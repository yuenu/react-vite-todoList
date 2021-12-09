import React, { useState } from 'react'
import styled from 'styled-components'
import {

  colordarkBlue800,
  colordarkGray100,
  colordarkGray200,
  colordarkGray300,
  colorlightGray100,
  colorlightGray200,
  colorlightGray400,
  colorlightGray500,
  colorPrimary,
  GlobalStyles
} from './assets/styles'
import { colordarkBlue900 } from './assets/styles'
import Icon from './components/Icon'
import darkBg from './assets/images/bg-desktop-dark.jpg'
import lightBg from './assets/images/bg-desktop-light.jpg'
import TodoList from './Todo/TodoList'
import TodoInput from './Todo/TodoInput'
import { useDispatch, useSelector } from 'react-redux'
import { clearCompleted, RootState, updatedAllTodos } from './store'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'


// STYLES
const Container = styled.div<{theme: 'dark' | 'light';}>`
  background-color: ${props => props.theme === 'dark' ? colordarkBlue900 : colorlightGray200};
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#333333'};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: all 300ms ease;

  @media(max-width:550px) {
    padding: 0 20px;
  }
`

const Background = styled.div`
  background: ${props => props.theme === 'dark' ? `url(${darkBg})` : `url(${lightBg})`};
  height: 30vh;
  width: 100%;
  object-fit: cover;
  position: fixed;
  top: 0;
  left: 0;
  transition: background 300ms ease;
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
  color: #ffffff;
`

const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${props => props.theme === 'dark' ? colorlightGray400 : colorlightGray500};
  background-color: ${props => props.theme === 'dark' ? colordarkBlue800 : colorlightGray100};
  padding:10px 20px;
  transition: all 300ms ease;
  border-radius: 0 0 3px 3px;

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
export const ThemeContext = React.createContext<'light' | 'dark'>('dark')

const App = () => {
  const dispatch = useDispatch()
  const todos = useSelector((state: RootState) => state.todosSlice.todos)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [stateStatus, setStateStatus] = useState<'all' | 'active' | 'completed'>('all')

  const changeTheme = () => {

    setTheme((prev) => {
      if (prev === 'dark') return 'light'
      return 'dark'
    })

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
      <ThemeContext.Provider value={theme}>
        <DragDropContext onDragEnd={onDragEndHandler}>
          <Container theme={theme}>
            <Background theme={theme} />
            <Main>
              <Header>
                <h1>Todo</h1>
                <Icon.Sun onClick={changeTheme} />
              </Header>

              <TodoInput theme={theme} />

              <TodoList todos={todos} stateStatus={stateStatus}></TodoList>

              <FilterSection theme={theme}>
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
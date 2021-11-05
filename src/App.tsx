import { useState } from 'react'
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
import { clearCompleted, getActiveTodos, getAllTodos, getCompletedTodos, RootState } from './store'


// STYLES
const Container = styled.div`
  background-color: ${colordarkBlue900};
  color: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
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
  margin-top: 10vh;
  z-index: 1;
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 6px;
  font-weight:400;
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

const App = () => {
  const dispatch = useDispatch()
  const todos = useSelector((state: RootState) => state.todosSlice.todos)
  const visiableTodos = useSelector((state: RootState) => state.todosSlice.visiableTodos)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  const changeTheme = () => {
    setTheme((preState) => {
      if (preState === 'dark') return 'light'
      return 'dark'
    })

    console.log('change theme')
  }

  const clearCompletedHandler = () => {
    dispatch(clearCompleted())
  }

  // FIXME: If input new todo, the status wolud not updated
  // const getAllTodos = () => setTodos(state)
  // const getActiveTodos = () => {
  //   setTodos(state.filter(item => item.done === false))
  // }

  // const getCompletedTodos = () => {
  //   setTodos(state.filter(item => item.done === true))
  // }

  return (
    <>
      <GlobalStyles></GlobalStyles>
      <Container>
        <Background />
        <Main>
          <Header>
            <h1>Todo</h1>
            <Icon.Sun onClick={changeTheme} />
          </Header>

          <TodoInput></TodoInput>

          <TodoList todos={visiableTodos}></TodoList>

          <FilterSection>
            <p>{todos.length} items left</p>
            <StateControl>
              <button className="active" onClick={() => dispatch(getAllTodos())} >All</button>
              <button onClick={() => dispatch(getActiveTodos())}>Active</button>
              <button onClick={() => dispatch(getCompletedTodos())}>Completed</button>
            </StateControl>
            <ClearButton onClick={clearCompletedHandler}>Clear Completed</ClearButton>
          </FilterSection>

          <Tips>Drag and drop to reorder list</Tips>
        </Main>

        <Footer className="attribution">
          Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.
          Coded by <a href="https://github.com/yuenu">yuenu</a>.
        </Footer>
      </Container>
    </>
  )
}


export default App
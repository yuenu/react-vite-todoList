import { Item } from '../components/Item'
import React, {
  ReactType,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react'
import Icon from '../components/Icon'
import { useDispatch } from 'react-redux'
import { removeTodo, updatedTodo } from '../store'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import {
  colordarkBlue900,
  colordarkGray200,
  colordarkGray300
} from '../assets/styles'
import { ThemeContext } from '../App'

type PropsType = {
  id: number
  text: string
  done: boolean
  index: number
}

const ItemContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`

const TextInput = styled.input`
  width: 100%;
  padding: 0 10px;
  margin-left: 20px;
  margin-right: 40px;
  font-size: 18px;
  background-color: ${colordarkBlue900};
  color: ${colordarkGray200};
  border: 0;
  outline: 0;
  display: inline-block;

  &::placeholder {
    color: ${colordarkGray300};
  }
`

type NormalFn = () => void

function useSingleAndDoubleClick(
  actionSimpleClick: NormalFn,
  actionDoubleClick: NormalFn,
  delay = 250
) {
  const [click, setClick] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      // simple click
      if (click === 1) actionSimpleClick()
      setClick(0)
    }, delay)

    // the duration between this click and the previous one
    // is less than the value of delay = double-click
    if (click === 2) actionDoubleClick()

    return () => clearTimeout(timer)
  }, [click])

  return () => setClick((prev) => prev + 1)
}

const TodoItem = React.memo(({ text, done, id, index }: PropsType) => {
  const dispatch = useDispatch()
  const [check, setCheck] = useState(done)
  const inputRef = useRef<HTMLInputElement>(null)
  const inputContent = useRef<HTMLSpanElement>(null)
  const [isEdit, setIsEdit] = useState(false)
  const [input, setInput] = useState(text)

  console.log('todoitem render')

  useLayoutEffect(() => {
    if (inputRef.current !== null) inputRef.current.checked = done
  })

  const onSingleClickHandler = () => {
    setCheck((prevState) => !prevState)
    dispatch(
      updatedTodo({
        id: id,
        text: text,
        done: !done
      })
    )
  }

  const onDoubleClickHandler = () => {
    setIsEdit(true)
  }

  const removeTodoHandler = (id: number) => {
    dispatch(removeTodo({ id }))
  }

  const clickHandler = useSingleAndDoubleClick(
    onSingleClickHandler,
    onDoubleClickHandler
  )

  const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setIsEdit(false)
      dispatch(
        updatedTodo({
          id: id,
          text: input,
          done: done
        })
      )
    }
  }

  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <Draggable draggableId={id.toString()} index={index}>
          {(provided, snapshot) => (
            <Item
              theme={theme}
              done={check}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <ItemContainer className="item__container">
                <input type="checkbox" id={`item${id}`} ref={inputRef} />
                <label htmlFor={`item${id}`} onClick={clickHandler}>
                  {!isEdit && <span>{text}</span>}
                </label>
                {isEdit && (
                  <TextInput
                    type="text"
                    value={input}
                    onChange={changeInputHandler}
                    onKeyDown={keyDownHandler}
                    placeholder="Text your todo item"
                  />
                )}
              </ItemContainer>
              <div onClick={() => removeTodoHandler(id)}>
                <Icon.Cross className="delete" />
              </div>
            </Item>
          )}
        </Draggable>
      )}
    </ThemeContext.Consumer>
  )
})

export default TodoItem

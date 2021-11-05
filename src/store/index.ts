import { configureStore } from '@reduxjs/toolkit'
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Todo = {
    id?: number,
    text: string,
    done: boolean
}

const initialToDoState: Todo[] = [
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


const todoSlice = createSlice({
    name: 'todos',
    initialState: initialToDoState,
    reducers: {
        addTodo: (state, action: PayloadAction<Todo>) => [...state, { id: Math.random(), ...action.payload }],
        removeTodo: (state, action: PayloadAction<Todo>) => {
            return state.filter(item => item.id !== action.payload.id)
        }
    }
})

export const { addTodo, removeTodo } = todoSlice.actions

export type RootState = ReturnType<typeof store.getState>

export const store = configureStore({
    reducer: {
        todos: todoSlice.reducer
    }
})
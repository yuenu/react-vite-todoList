import { configureStore } from '@reduxjs/toolkit'
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TodoType = {
    id: number,
    text: string,
    done: boolean
}

export type inputTodoType = {
    text: string,
    done: boolean
}

export const enum StateStatus {
    All = 'all',
    ACTIVE = 'active',
    COMPLETED = 'completed'
}

const initialTodos = [
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

const initialState = {
    todos: initialTodos,
    isLoading: false,
    visiableTodos: initialTodos,
    statusControl: StateStatus.All
}

const todoSlice = createSlice({
    name: 'todosSlice',
    initialState: initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<inputTodoType>) => {
            state.todos = [{ id: Math.random(), ...action.payload }, ...state.todos]
        },
        removeTodo: (state, action: PayloadAction<{ id: number}>) => {
            state.todos = state.todos.filter(item => item.id !== action.payload.id)
        },
        clearCompleted: (state) => {
            state.todos = state.todos.filter((item) => item.done === false)
            state.visiableTodos = state.todos
        },
        updateTodo: (state, action: PayloadAction<TodoType>) => {
            const wouldUpdatedItem = state.todos.filter((item) => item.done === false)
        },
        getAllTodos: (state) => {
            state.visiableTodos = state.todos
        },
        getActiveTodos: (state) => {
            state.visiableTodos = state.todos.filter((item) => item.done === false)
        },
        getCompletedTodos: (state) => {
            state.visiableTodos = state.todos.filter((item) => item.done === true)
        },
        // setStateStatus(state, action: PayloadAction<StateStatus>) => {
        // }
    }
})

export const {
    addTodo,
    removeTodo,
    clearCompleted,
    getAllTodos,
    getActiveTodos,
    getCompletedTodos
} = todoSlice.actions

export type RootState = ReturnType<typeof store.getState>

export const store = configureStore({
    reducer: {
        todosSlice: todoSlice.reducer
    }
})
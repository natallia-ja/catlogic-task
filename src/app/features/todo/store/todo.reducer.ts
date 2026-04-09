import {ITodo} from './todo.model';
import {createReducer, on} from '@ngrx/store';
import * as TodoActions from './todo.actions';

export interface ITodoState {
  todos: ITodo[];      // отфильтрованные
  allTodos: ITodo[];   // полный список
  loading: boolean;
}

export const initialState: ITodoState = {
  todos: [],
  allTodos: [],
  loading: false,
  //total: 0
};

export const todoReducer = createReducer(
  initialState,

  on(TodoActions.getTodos, state => ({
    ...state,
    loading: true
  })),

  on(TodoActions.getTodosSuccess, (state, { todos }) => ({
    ...state,
    todos,
    allTodos: todos,
    loading: false
  })),

  on(TodoActions.editTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: state.todos.map(t =>
      t.id === todo.id ? { ...t, ...todo } : t
    )
  }))

);

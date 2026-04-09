import {ITodo} from './todo.model';
import {createReducer, on} from '@ngrx/store';
import * as TodoActions from './todo.actions';

export interface ITodoState {
  todos: ITodo[];
  loading: boolean;
  total: number;
}

export const initialState: ITodoState = {
  todos: [],
  loading: false,
  total: 0
};

export const todoReducer = createReducer(
  initialState,

  on(TodoActions.getTodos, state => ({
    ...state,
    loading: true
  })),

  on(TodoActions.getTodosSuccess, (state, { todos, total }) => ({
    ...state,
    todos,
    total,
    loading: false
  })),

  on(TodoActions.editTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: state.todos.map(t =>
      t.id === todo.id ? { ...t, ...todo } : t
    )
  }))

);

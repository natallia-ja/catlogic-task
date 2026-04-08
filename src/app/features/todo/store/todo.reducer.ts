import {ITodo} from './todo.model';
import {createReducer, on} from '@ngrx/store';
import * as TodoActions from './todo.actions';

export interface ITodoState {
  todos: ITodo[];
  loading: boolean;
}

export const initialState: ITodoState = {
  todos: [],
  loading: false
};

export const todoReducer = createReducer(
  initialState,

  on(TodoActions.loadTodos, state => ({
    ...state,
    loading: true
  })),

  on(TodoActions.loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos,
    loading: false
  }))
);

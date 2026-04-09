import {ITodo} from './todo.model';
import {createReducer, on} from '@ngrx/store';
import * as TodoActions from './todo.actions';
import {searchTodos} from './todo.actions';

export interface ITodoState {
  todos: ITodo[];      // отфильтрованные
  allTodos: ITodo[];   // полный список
  searchQuery: string;
}

export const initialState: ITodoState = {
  todos: [],
  allTodos: [],
  searchQuery: ''
};

export const todoReducer = createReducer(
  initialState,

  on(TodoActions.getTodos, state => ({
    ...state
  })),

  on(TodoActions.getTodosSuccess, (state, { todos }) => ({
    ...state,
    todos,
    allTodos: todos
  })),

  on(TodoActions.editTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: state.todos.map(t =>
      t.id === todo.id ? { ...t, ...todo } : t
    )
  })),

  on(searchTodos, (state, { query }) => {
    const filtered = state.allTodos.filter(todo =>
      todo.todo.toLowerCase().includes(query.toLowerCase())
    );

    return {
      ...state,
      searchQuery: query,
      todos: filtered
    };
  })

);

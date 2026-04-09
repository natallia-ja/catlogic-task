import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ITodoState} from './todo.reducer';

export const selectTodoState = createFeatureSelector<ITodoState>('todos');

export const selectTodos = createSelector(
  selectTodoState,
  state => state.todos
);

export const selectTotal = createSelector(
  selectTodoState,
  state => state.total
);

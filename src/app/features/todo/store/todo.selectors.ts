import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ITodoState} from './todo.reducer';
import {ITodo} from './todo.model';

export const selectTodoState = createFeatureSelector<ITodoState>('todos');

export const selectTodos = createSelector(
  selectTodoState,
  state => state.todos
);

/*
export const selectTotal = createSelector(
  selectTodoState,
  state => state.total
);
*/
export const selectTotal = createSelector(
  selectTodos,
  todos => todos.length
);

export const selectPagedTodos = createSelector(
  selectTodos,
  (todos: ITodo[], props: { page: number; limit: number }) => {
    const start = (props.page - 1) * props.limit;
    return todos.slice(start, start + props.limit);
  }
);

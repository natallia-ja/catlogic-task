import {createAction, props} from '@ngrx/store';
import {ITodo} from './todo.model';

export const getTodos = createAction('[Todo] Get Todos', props<{ page: number; limit: number }>());
export const getTodosSuccess = createAction(
  '[Todo] Get Todos Success',
  props<{ todos: ITodo[]; total: number }>()
);

export const getTodosFailure = createAction(
  '[Todo] Get Todos Failure',
  props<{ error: any }>()
);

export const editTodo = createAction(
  '[Todo] Edit Todo',
  props<{ id: number; changes: Partial<ITodo> }>()
);

export const editTodoSuccess = createAction(
  '[Todo] Edit Todo Success',
  props<{ todo: ITodo }>()
);

export const editTodoFailure = createAction(
  '[Todo] Edit Todo Failure',
  props<{ error: any }>()
);

export const searchTodos = createAction(
  '[Todo] Search Todos',
  props<{ query: string }>()
);

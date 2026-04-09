
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as TodoActions from './todo.actions';
import {catchError, map, of, switchMap, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { inject } from '@angular/core';
import {ITodo} from './todo.model';

@Injectable()
export class TodoEffects {

  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  getTodosList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.getTodos),
      switchMap(({ page, limit }) => {

        return this.http.get<any>(
          //`https://dummyjson.com/todos?limit=${limit}&skip=${skip}`
          `https://dummyjson.com/todos?limit=0`
        ).pipe(
          map(res => TodoActions.getTodosSuccess({
            todos: res.todos,
            total: res.total
          })),
          catchError(error => of(TodoActions.getTodosFailure({ error })))
        );
      })
    )
  );
  editTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.editTodo),
      switchMap(({ id, changes }) =>
        this.http.patch<ITodo>(
          `https://dummyjson.com/todos/${id}`,
          changes
        ).pipe(
          map(todo => TodoActions.editTodoSuccess({ todo })),
          catchError(error => of(TodoActions.editTodoFailure({ error })))
        )
      )
    )
  );
}

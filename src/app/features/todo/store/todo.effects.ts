
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as TodoActions from './todo.actions';
import {catchError, map, of, switchMap, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
/*
@Injectable()
export class TodoEffects {

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      switchMap(() =>
        this.http.get<any>('https://dummyjson.com/docs/todos').pipe(
          map(res => TodoActions.loadTodosSuccess({ todos: res.todos })),
          catchError(error => of(TodoActions.loadTodosFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}
}
*/

import { inject } from '@angular/core';

@Injectable()
export class TodoEffects {

  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      switchMap(() =>
        this.http.get<any>('https://dummyjson.com/todos').pipe(
          map(res => TodoActions.loadTodosSuccess({ todos: res.todos })),
          catchError(error => of(TodoActions.loadTodosFailure({ error })))
        )
      )
    )
  );
}

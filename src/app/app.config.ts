import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideStore} from '@ngrx/store';
import {todoReducer} from './features/todo/store/todo.reducer';
import {provideEffects} from '@ngrx/effects';
import {TodoEffects} from './features/todo/store/todo.effects';
import {provideHttpClient} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      todos: todoReducer
    }),
    provideEffects([TodoEffects])
  ]
};

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'list',
    loadComponent: () => import('./features/todo/components/todo-list/todo-list.component')
      .then(m => m.TodoListComponent)
  },
  {
    path: 'table',
    loadComponent: () => import('./features/todo/components/todo-table/todo-table.component')
      .then(m => m.TodoTableComponent)
  }
];

import { Routes } from '@angular/router';
import {LayoutComponent} from './shared/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
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
    ]
  }
/*  {
    path: 'list',
    loadComponent: () => import('./features/todo/components/todo-list/todo-list.component')
      .then(m => m.TodoListComponent)
  },
  {
    path: 'table',
    loadComponent: () => import('./features/todo/components/todo-table/todo-table.component')
      .then(m => m.TodoTableComponent)
  }*/
];

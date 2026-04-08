import { Component } from '@angular/core';
import {Store} from '@ngrx/store';
import * as TodoActions from '../../store/todo.actions';
import {ITodo} from '../../store/todo.model';
import {selectTodos} from '../../store/todo.selectors';
import {CommonModule} from '@angular/common';
@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {

  todos$! : any//todo
  constructor(
    private store: Store
  ) {
    this.todos$ = this.store.select(selectTodos);
  }

  ngOnInit() {
    this.store.dispatch(TodoActions.loadTodos());
  }
}

import {Component, DestroyRef} from '@angular/core';
import {Store} from '@ngrx/store';
import * as TodoActions from '../../store/todo.actions';
import {ITodo} from '../../store/todo.model';
import {selectTodos, selectTotal} from '../../store/todo.selectors';
import {CommonModule} from '@angular/common';
import {TodoCardComponent} from '../todo-card/todo-card.component';
import {Observable} from 'rxjs';
import {PaginationComponent} from '../../../../shared/pagination/pagination.component';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ModalComponent} from '../../../../shared/modal/modal.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {editTodo} from '../../store/todo.actions';

export interface IQueryParams{
  page?: number;
  limit?: number;
  search?: string;
}
@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TodoCardComponent, PaginationComponent, ModalComponent, ReactiveFormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {

  todos$! : Observable<ITodo[]>;
  total$! : Observable<number>;
  page: number = 1;
  limit: number = 10;
  isModalOpen: boolean = false;
  selectedTodo: ITodo | null = null;
  todoForm!: FormGroup;
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private destroyRef: DestroyRef,
    private formBuilder: FormBuilder,
  ) {
    this.todos$ = this.store.select(selectTodos);
    this.total$ = this.store.select(selectTotal)

    this.route.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params: IQueryParams) => {
          if(params.page) this.page = +params.page;
          if(params.limit) this.limit = +params.limit;
      });
  }

  ngOnInit() {
    //this.store.dispatch(TodoActions.loadTodos());
    this.getTodos();
  }

  getTodos() {
    console.log("getTodos")
    this.store.dispatch(TodoActions.getTodos({
      page: this.page,
      limit: this.limit
    }));
  }

  onPageChange(page: number) {
    this.page = page;
    this.navigate();
    this.getTodos();
  }

  navigate(){
    const queryParams: IQueryParams = {
      page: this.page,
      limit: this.limit
    };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams
    });
  }

  onLimitChange(limit: number) {
    this.limit = limit;
    this.page = 1;
    this.navigate();
    this.getTodos();
  }


  openModal(todo: ITodo) {
    this.selectedTodo = todo;
    this.isModalOpen = true;
    this.fillTodoForm();
  }

  fillTodoForm(){
    this.todoForm = this.formBuilder.group({
      todo: [this.selectedTodo?.todo || '', Validators.required],
      completed: [this.selectedTodo?.completed || false],
      userId: [this.selectedTodo?.userId || null, Validators.required]
    })
  }

  closeModal() {
    this.isModalOpen = false;
  }


  editTodo(){
    console.log("editTodo")
    if (!this.todoForm.valid || !this.selectedTodo) return;
    this.store.dispatch(editTodo({
      id: this.selectedTodo.id,
      changes: this.todoForm.value
    }));
    this.closeModal();
  }

}

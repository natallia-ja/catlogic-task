import {Component, DestroyRef, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as TodoActions from '../../store/todo.actions';
import {ITodo} from '../../store/todo.model';
import {selectPagedTodos, selectTodos, selectTotal} from '../../store/todo.selectors';
import {CommonModule} from '@angular/common';
import {TodoCardComponent} from '../todo-card/todo-card.component';
import {debounceTime, distinctUntilChanged, Observable, Subject} from 'rxjs';
import {PaginationComponent} from '../../../../shared/pagination/pagination.component';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ModalComponent} from '../../../../shared/modal/modal.component';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

export interface IQueryParams{
  page?: number;
  limit?: number;
  search?: string;
}
@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TodoCardComponent, PaginationComponent, ModalComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {

  todos$! : Observable<ITodo[]>;
  pagedTodos$! : Observable<ITodo[]>;
  page: number = 1;
  limit: number = 10;
  isModalOpen: boolean = false;
  selectedTodo: ITodo | null = null;
  todoForm!: FormGroup;
  search: string = '';
  private searchSubject = new Subject<string>();
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private destroyRef: DestroyRef,
    private formBuilder: FormBuilder,
  ) {}


  ngOnInit() {
    this.todos$ = this.store.select(selectTodos);
    this.getTodos();
    this.updatePagedTodos();
    this.route.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params: IQueryParams) => {
        if(params.page) this.page = +params.page;
        if(params.limit) this.limit = +params.limit;
        if (params.search) {
          this.search = params.search;
          this.searchSubject.next(this.search);
        }
      });
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(query => {
      this.page = 1;
      this.store.dispatch(TodoActions.searchTodos({
        query: query || ''
      }));
      this.updatePagedTodos();
      this.navigate();
    });
  }

  getTodos() {
    this.store.dispatch(TodoActions.getTodos({
      page: this.page,
      limit: this.limit
    }));
  }

  onSearch(value: string) {
    this.searchSubject.next(value);
    this.updatePagedTodos();
    this.navigate();
  }

  clearSearch(){
    this.search = '';
    this.searchSubject.next('');
  }
  updatePagedTodos() {
    this.pagedTodos$ = this.store.select(selectPagedTodos, {
      page: this.page,
      limit: this.limit
    });
  }

  onPageChange(page: number) {
    this.page = page;
    this.updatePagedTodos();
    this.navigate();
  }

  navigate(){
    const queryParams: IQueryParams = {
      page: this.page,
      limit: this.limit,
      search: this.search
    };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams
    });
  }

  onLimitChange(limit: number) {
    this.limit = limit;
    this.page = 1;
    this.updatePagedTodos();
    this.navigate();
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
    if (!this.todoForm.valid || !this.selectedTodo) return;
    this.store.dispatch(TodoActions.editTodo({
      id: this.selectedTodo.id,
      changes: this.todoForm.value
    }));
    this.closeModal();
  }

}

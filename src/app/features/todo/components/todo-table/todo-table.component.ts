import {Component, DestroyRef, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {Observable, Subject} from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';

import { ITodo } from '../../store/todo.model';
import { selectTodos } from '../../store/todo.selectors';

import * as TodoActions from '../../store/todo.actions';
import {ActivatedRoute, Router} from '@angular/router';
import {IQueryParams} from '../todo-list/todo-list.component';

@Component({
  selector: 'todo-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-table.component.html',
  styleUrl: './todo-table.component.scss'
})
export class TodoTableComponent implements OnInit{

  todos$!: Observable<ITodo[]>;
  search: string = '';

  private searchSubject = new Subject<string>();

  constructor(
    private store: Store,
    private destroyRef: DestroyRef,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.todos$ = this.store.select(selectTodos);
    this.getTodos();
    this.route.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params: IQueryParams) => {
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
      this.store.dispatch(TodoActions.searchTodos({
        query: query || ''
      }));
      this.navigate();
    });
  }

  getTodos() {
    this.store.dispatch(TodoActions.getTodos({
      page: 1,
      limit: 0
    }));
  }
  onSearch(value: string) {
    this.searchSubject.next(value);
    this.navigate();
  }

  clearSearch() {
    this.search = '';
    this.searchSubject.next('');
  }

  navigate(){
    const queryParams: IQueryParams = {
      search: this.search
    };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams
    });
  }
}

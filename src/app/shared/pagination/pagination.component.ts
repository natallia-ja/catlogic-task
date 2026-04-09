import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() page: number = 1;
  @Input() total: number = 0;
  @Input() limit: number = 10;

  @Output() pageChange = new EventEmitter<number>();
  @Output() limitChange = new EventEmitter<number>();

  get totalPages(): number {
    console.log("this.total", this.total)
    console.log("this.this.limit", this.limit)
    return Math.ceil(this.total / this.limit);
  }

  next() {
    if (this.page < this.totalPages) {
      this.pageChange.emit(this.page + 1);
    }
  }

  prev() {
    if (this.page > 1) {
      this.pageChange.emit(this.page - 1);
    }
  }

  changeLimit(event: any) {
    const value = Number(event.target.value);
    this.limitChange.emit(value);
  }
}

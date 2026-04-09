import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ITodo} from '../../store/todo.model';

@Component({
  selector: 'todo-card',
  standalone: true,
  imports: [],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss'
})
export class TodoCardComponent {

  @Input() id!: number;
  @Input() todo!: string;
  @Input() completed!: boolean;
  @Input() userId!: number;

  @Output() onDeleteCard = new EventEmitter<void>();
  @Output() onEditCard = new EventEmitter<void>();
  constructor() {
  }
  editCard(){
    this.onEditCard.emit()
  }
  deleteCard(){
    this.onDeleteCard.emit()
  }
}

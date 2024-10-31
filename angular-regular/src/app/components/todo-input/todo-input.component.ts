import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-todo-input',
  standalone: true,
  imports: [],
  templateUrl: './todo-input.component.html',
  styleUrl: './todo-input.component.css'
})
export class TodoInputComponent {

  @Output()
  newTodo: EventEmitter<string> = new EventEmitter<string>();
  addTodo(newTodo: string) {
    this.newTodo.emit(newTodo)
  }
}

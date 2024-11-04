import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';
import {Todo} from '../../models/todo';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    FormsModule
  ],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {
  @Input()
  users: string[] = [];
  @Input()
  todo: Todo|undefined;
  @Input()
  index: number = 0;
  @Output()
  updateUserEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  deleteTodoEmitter: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  startEditEmitter: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  finishEditEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  todoCompletedEmitter: EventEmitter<Todo> = new EventEmitter<Todo>();

  updateUser(todo: Todo, user: string) {
    this.updateUserEmitter.emit({todo: todo, user: user});
  }

  deleteTodo(id: number) {
    this.deleteTodoEmitter.emit(id);
  }

  startEdit(index: number) {
    this.startEditEmitter.emit(index);
  }

  finishEdit(index: number, todo: Todo, value: string) {
    this.finishEditEmitter.emit({index: index, todo: todo, value: value});
  }

  toggleCompleted(todo: Todo) {
    this.todoCompletedEmitter.emit(todo);
  }
}

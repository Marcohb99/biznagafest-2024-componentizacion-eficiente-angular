import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Todo} from '../../models/todo';
import {NgClass} from '@angular/common';
import {TaskItemComponent} from '../task-item/task-item.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgClass,
    TaskItemComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  @Input()
  todos: Todo[] = [];
  @Input()
  users: string[] = [];
  @Output()
  updateUserEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteTodoEmitter = new EventEmitter<number>();
  @Output()
  startEditEmitter: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  finishEditEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  todoCompletedEmitter: EventEmitter<Todo> = new EventEmitter<Todo>();

  updateUser(data: any) {
    this.updateUserEmitter.emit({todo: data.todo, user: data.user});
  }
  deleteTodo(id: number): void {
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

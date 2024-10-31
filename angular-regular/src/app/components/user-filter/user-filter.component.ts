import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-user-filter',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './user-filter.component.html',
  styleUrl: './user-filter.component.css'
})
export class UserFilterComponent {
  @Input()
  selectedUser: string = '';
  @Input()
  users: string[] = [];
  @Output()
  userChanged: EventEmitter<string> = new EventEmitter<string>();

  updateSelectedUser(user: string) {
    this.userChanged.emit(user);
  }
}

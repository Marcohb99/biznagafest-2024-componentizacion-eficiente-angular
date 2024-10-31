import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-status-filter',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './status-filter.component.html',
  styleUrl: './status-filter.component.css'
})
export class StatusFilterComponent {
  @Input()
  filter: string = '';
  @Output()
  filterChange: EventEmitter<string> = new EventEmitter<string>();
  updateFilter(newFilter: string) {
    this.filterChange.emit(newFilter);
  }
}

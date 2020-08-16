import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../models/tasks';

@Component({
  selector: 'app-pending-tasks',
  templateUrl: './pending-tasks.component.html',
  styleUrls: ['./pending-tasks.component.css']
})
export class PendingTasksComponent implements OnInit {

  constructor() { }

  @Input() tasks: Task[];
  @Output() 
  editTaskEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteTaskEvent: EventEmitter<any> = new EventEmitter<any>();
  ngOnInit(): void {
  }

  ediTask(index) {
    this.editTaskEvent.emit({ type: 'pending', index })
  }

  deleteTask(index) {
    this.deleteTaskEvent.emit({ type: 'pending', index })
  }

}

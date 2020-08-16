import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../models/tasks';

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styleUrls: ['./completed-tasks.component.css']
})
export class CompletedTasksComponent implements OnInit {

  constructor() { }
  @Input() tasks: Task[];
  @Output() 
  editTaskEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteTaskEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() changeTaskStatus: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
  }

  ediTask(index) {
    this.editTaskEvent.emit({ type: 'completed', index })
  }

  deleteTask(index) {
    this.deleteTaskEvent.emit({ type: 'completed', index })
  }

  onTasksDrop(value) {
    console.log('value', value)
    this.changeTaskStatus.emit({ type: 'completed', value })
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../models/tasks';

@Component({
  selector: 'app-in-process-tasks',
  templateUrl: './in-process-tasks.component.html',
  styleUrls: ['./in-process-tasks.component.css']
})
export class InProcessTasksComponent implements OnInit {

  constructor() { }
  @Input() tasks: Task[];
  @Output() 
  editTaskEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteTaskEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() changeTaskStatus: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
  }

  ediTask(index) {
    this.editTaskEvent.emit({ type: 'inProcess', index })
  }

  deleteTask(index) {
    this.deleteTaskEvent.emit({ type: 'inProcess', index })
  }

  onTasksDrop(value) {
    console.log('value', value)
    this.changeTaskStatus.emit({ type: 'inProcess', value })

  }

}

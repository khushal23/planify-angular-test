import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../services/data.service';
import { AllTaskTypes } from '../models/tasks';
import { AddEditTaskComponent } from '../add-edit-task/add-edit-task.component';
import * as moment from 'moment';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

  constructor(private dataService: DataService) { }
  tasks: AllTaskTypes = {
    date: new Date(),
    pending: [],
    inProcess: [],
    completed: []
  }
  percentageCompletedTasks = 0;
  @ViewChild('addEditTaskReference') AddEditTaskRef: AddEditTaskComponent;
  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.dataService.getTasks().subscribe(
      (res) => {
        this.tasks = res;

        this.percentageCompletedTasks = ((this.tasks.completed.length / (this.tasks.pending.length + this.tasks.inProcess.length + this.tasks.completed.length)) * 100);
      },
      (err) => {
        console.log('error', err);
      }
    )
  }

  addTask() {
    this.AddEditTaskRef.openModal(false);
  }

  editTask(value) {
    console.log('value', value)
    this.AddEditTaskRef.openModal(true, {tasks: this.tasks, value: value});
  }

  deleteTask(value) {
    this.dataService.deleteTask(value.index, value.type).subscribe(
      (res) => {
        this.getTasks();
      },
      (err) => {
        console.log('error', err);
      }
    )
  }

  changeTaskStatus(data) {
    console.log('value', data)
    this.dataService.changeTaskStatus(data.value.dragData.from, data.value.dragData.i, data.type).subscribe(
      (res) => {
        this.getTasks();
      },
      (err) => {
        console.log('error', err);
      }
    )
  }

}

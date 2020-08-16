import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { DataService } from '../services/data.service';
declare var $:any;

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.css']
})
export class AddEditTaskComponent implements OnInit {

  constructor(private dataService: DataService) { }

  editMode: Boolean = false;
  title: String = '';
  description: String = '';
  priority: String = '';
  date:any;
  datePickerConfig = {
    min: moment()
  }

  selectedType = null;
  selectedIndex = null;

  @Output() 
  taskChanged: EventEmitter<any> = new EventEmitter<any>();
  
  ngOnInit(): void {
  }

  openModal(isEdit: Boolean, data = null) {
    this.editMode = isEdit;
    console.log('openmodal ............................', $)
    $('#add-edit-task').modal()
    if(isEdit) {
      this.selectedIndex = data.value.index;
      this.selectedType = data.value.type;

      let currentTask = data['tasks'][data.value.type][data.value.index];

      this.title = currentTask.title;
      this.description = currentTask.description;
      this.priority = currentTask.priority;
      this.date = moment(currentTask.date);
    }
  }

  saveTask(f) {
    if(this.editMode) {
      this.editTask(f);
    } else {
      this.addTask(f);
    }
  }


  addTask(f) {
    console.log('add task', f)
    let newTask = {
      title: this.title,
      description: this.description,
      priority: this.priority,
      date: this.date
    }
    if (f.invalid) return;
    this.dataService.addTask(newTask).subscribe(
      (res) => {
        console.log(res);
        this.taskChanged.emit('change')
        $('#add-edit-task').modal('hide')
      },
      (err) => {
        console.log('err', err)
      }
    )
  }

  editTask(f) {
    console.log('edit task', f)
    let newTask = {
      title: this.title,
      description: this.description,
      priority: this.priority,
      date: this.date
    }
    if (f.invalid) return;
    this.dataService.editTask(newTask, this.selectedIndex, this.selectedType).subscribe(
      (res) => {
        console.log(res);
        this.taskChanged.emit('change')
        $('#add-edit-task').modal('hide')
      },
      (err) => {
        console.log('err', err)
      }
    )
  }

}

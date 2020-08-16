import { Injectable } from '@angular/core';
import { AllTaskTypes } from '../models/tasks';
import { of as observableOf, Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  tasks: AllTaskTypes[] = [
    {
      pending: [],
      inProcess: [],
      completed: [],
      date: new Date()
    }
  ]

  defaultData: AllTaskTypes[] = [
    {
      date: new Date(),
      pending: [
        {
          title: 'Call Dad',
          description: 'call dad',
          priority: 'normal'
        },
        {
          title: 'Go Shopping',
          description: 'go for shopping',
          priority: 'high'
        }
      ],
      inProcess: [
        {
          title: 'homework',
          description: 'do homework',
          priority: 'normal'
        }
      ],
      completed: [
        {
          title: 'clean room',
          description: 'clean the room',
          priority: 'normal'
        }
      ]
    }
  ]

  constructor() { }


  getTasks(): Observable<AllTaskTypes> {
    let tasks = localStorage.getItem('allTasks');
    if (!tasks) {
      localStorage.setItem('allTasks', JSON.stringify(this.defaultData))
      return observableOf(this.defaultData[0]);
    } else {
      let taskJson = JSON.parse(tasks);
      let todayTasks;
      for (let i = 0; i < taskJson.length; i++) {
        const element = taskJson[i];
        if (moment(element.date).diff(moment(), 'day') == 0) {
          todayTasks = element;
        }
      }
      if (todayTasks) return observableOf(todayTasks);
      else return observableOf({
        date: new Date(),
        pending: [],
        inProcess: [],
        completed: []
      })
    }
  }

  addTask(newTask) {

    let allTasks = []
    let tasks = localStorage.getItem('allTasks');
    if (tasks) allTasks = JSON.parse(tasks);

    console.log('all tasks', allTasks)

    let dateTask = null;
    for (let i = 0; i < allTasks.length; i++) {
      const element = allTasks[i];
      if (moment(element.date).diff(moment(newTask.date), 'day') == 0) {
        dateTask = element;
        break;
      }
    }

    console.log('dateTask', dateTask)

    if (dateTask) {
      dateTask.pending.push({
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority,
      });

      localStorage.setItem('allTasks', JSON.stringify(allTasks))
    } else {

      let pendingTask = [];
      pendingTask.push({
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority,
      });

      allTasks.push({
        date: moment(newTask.date).toDate(),
        pending: pendingTask,
        inProcess: [],
        completed: []
      })

      console.log('all tasks', allTasks)
      localStorage.setItem('allTasks', JSON.stringify(allTasks))

    }

    return observableOf(newTask);
  }

  editTask(updateTask, index, type) {
    let allTasks = []
    let tasks = localStorage.getItem('allTasks');
    if (tasks) allTasks = JSON.parse(tasks);

    console.log('all tasks', allTasks)

    let dateTask = null;
    for (let i = 0; i < allTasks.length; i++) {
      const element = allTasks[i];
      if (moment(element.date).diff(moment(), 'day') == 0) {
        dateTask = element;
        break;
      }
    }

    if (dateTask) {
      console.log('date task', dateTask)
      if (moment().diff(moment(updateTask.date), 'day') == 0) {
        console.log('same date')
        let updateObj = {
          title: updateTask.title,
          description: updateTask.description,
          priority: updateTask.priority,
        }
        dateTask[type][index] = updateObj;

      } else {
        console.log('not same date')
        dateTask[type].splice(index, 1)
        let taskObj = null;
        for (let i = 0; i < allTasks.length; i++) {
          const element = allTasks[i];
          if (moment(element.date).diff(moment(updateTask.date), 'day') == 0) {
            console.log('date found')
            element[type].push({
              title: updateTask.title,
              description: updateTask.description,
              priority: updateTask.priority,
            })
            taskObj = element

          }
        }

        if (!taskObj) {
          console.log(' no date found')

          let pendingTask = [];
          pendingTask.push({
            title: updateTask.title,
            description: updateTask.description,
            priority: updateTask.priority,
          });

          allTasks.push({
            date: moment(updateTask.date).toDate(),
            pending: pendingTask,
            inProcess: [],
            completed: []
          })

        }

      }

      localStorage.setItem('allTasks', JSON.stringify(allTasks))
      return observableOf(allTasks)
    }
  }


  deleteTask(index, type) {
    let allTasks = []
    let tasks = localStorage.getItem('allTasks');
    if (tasks) allTasks = JSON.parse(tasks);

    console.log('all tasks', allTasks)

    let dateTask = null;
    for (let i = 0; i < allTasks.length; i++) {
      const element = allTasks[i];
      if (moment(element.date).diff(moment(), 'day') == 0) {
        dateTask = element;
        break;
      }
    }

    if (dateTask) {
      console.log('type', type)
      console.log('type', index)
      console.log('type', dateTask)
      dateTask[type].splice(index, 1)
    }
    localStorage.setItem('allTasks', JSON.stringify(allTasks))
    return observableOf(allTasks)
  }


  changeTaskStatus(from, index, to) {
    let allTasks = []
    let tasks = localStorage.getItem('allTasks');
    if (tasks) allTasks = JSON.parse(tasks);

    console.log('all tasks', allTasks)

    let dateTask = null;
    for (let i = 0; i < allTasks.length; i++) {
      const element = allTasks[i];
      if (moment(element.date).diff(moment(), 'day') == 0) {
        dateTask = element;
        break;
      }
    }

    if(dateTask) {
      let ele = dateTask[from][index];
      dateTask[from].splice(index, 1);
      dateTask[to].push(ele)
    }

    localStorage.setItem('allTasks', JSON.stringify(allTasks))
    return observableOf(allTasks)

  }
}

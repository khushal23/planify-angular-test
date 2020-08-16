import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { AddEditTaskComponent } from './add-edit-task/add-edit-task.component';

const routes: Routes = [
  {
    path: '',
    component: TasksListComponent
  },
  {
    path: 'add',
    component: AddEditTaskComponent
  },
  {
    path: 'edit',
    component: AddEditTaskComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {DpDatePickerModule} from 'ng2-date-picker';
import { NgDragDropModule } from 'ng-drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { PendingTasksComponent } from './pending-tasks/pending-tasks.component';
import { InProcessTasksComponent } from './in-process-tasks/in-process-tasks.component';
import { CompletedTasksComponent } from './completed-tasks/completed-tasks.component';
import { DataService } from './services/data.service';
import { AddEditTaskComponent } from './add-edit-task/add-edit-task.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksListComponent,
    PendingTasksComponent,
    InProcessTasksComponent,
    CompletedTasksComponent,
    AddEditTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DpDatePickerModule,
    NgDragDropModule.forRoot()
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

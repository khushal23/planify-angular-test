import { Observable } from 'rxjs';

export interface Task {
  title: string;
  description: string;
  priority: string;
}

export interface AllTaskTypes {
  date: Date;
  pending: Task[];
  inProcess: Task[];
  completed: Task[];
}

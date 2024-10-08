import { Component, Input } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddTaskComponent } from '../add-task/add-task.component';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    AddTaskComponent,
    FormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  tasks: Task[] = [];
  private subscriptions = new Subscription();
  editingTaskId: string | undefined | null = null;
  showAddTaskModal = false;

  constructor(private TaskService: TaskService, private logger: NGXLogger) {}

  ngOnInit() {
    const tasksSubscription = this.TaskService.getTasks().subscribe(
      (data: Task[]) => {
        // initialise le tableau de taches avec un observable renvoyé par le back
        this.tasks = data;
        this.logger.debug(this.tasks);
      }
    );
    this.subscriptions.add(tasksSubscription);
  }


  onTaskAdded(newTask: Task){
    this.tasks.push(newTask);
  }

  editTask(task: Task) {
    this.editingTaskId = task._id;
  }

 

  removeTask(task: Task) {
    const deleteTaskSubscription = this.TaskService.deleteTask(
      task._id
    ).subscribe({
      next: (response) => {
        this.tasks = this.tasks.filter((t) => t._id !== task._id);
        this.logger.info(response);
      },
      error: (err) => {
        this.logger.error('Delete error : ', err);
      },
    });
    this.subscriptions.add(deleteTaskSubscription);
  }

  updateTask(task: Task) {
    this.logger.debug(task);
    // this.logger.debug(task);
    const updateTaskSubscription = this.TaskService.updateTask(task).subscribe({
      next: (response) => {
        const index = this.tasks.findIndex((t) => t._id === task._id);
        this.tasks[index].title = task.title;
        this.tasks[index].completed = task.completed;
        this.editingTaskId = null;
      },
      error: (err) => {
        this.logger.error('Update error : ', err);      
      },
    });
    this.subscriptions.add(updateTaskSubscription);
  }

  cancelUpdateTask() {
    this.editingTaskId = null;
  }

  openTaskDetailModal(task: Task) {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
  imports: [CommonModule],
})
export class TodoListComponent {
  protected readonly todoService = inject(TodoService);

  toggleTodo(id: number): void {
    this.todoService.toggleTodo(id);
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id);
  }

  setFilter(status: 'all' | 'pending' | 'completed'): void {
    this.todoService.setFilter({ status });
  }

  clearCompleted(): void {
    this.todoService.clearCompleted();
  }

  getTodoClasses(todo: Todo): string {
    const classes = [`priority-${todo.priority}`];
    if (todo.completed) {
      classes.push('completed');
    }
    return classes.join(' ');
  }

  getPriorityLabel(priority: Todo['priority']): string {
    const labels = {
      high: 'Alta',
      medium: 'Media',
      low: 'Bassa'
    };
    return labels[priority];
  }
}

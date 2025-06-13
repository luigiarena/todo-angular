import { Component, inject, signal } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class AddTodoComponent {
  private readonly todoService = inject(TodoService);
  private readonly fb = inject(FormBuilder);

  protected readonly showForm = signal(false);
  protected readonly isSubmitting = signal(false);

  protected readonly todoForm = this.fb.group({
    title: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)
    ]],
    description: ['', [Validators.maxLength(500)]],
    priority: ['medium' as Todo['priority']]
  });

  toggleForm(): void {
    this.showForm.update(show => !show);
    if (this.showForm()) {
      // Focus sul campo titolo quando si apre il form
      setTimeout(() => {
        document.getElementById('title')?.focus();
      }, 100);
    }
  }

  async onSubmit(): Promise<void> {
    if (this.todoForm.valid) {
      this.isSubmitting.set(true);
      
      // Simula un piccolo delay per il feedback UI
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const formValue = this.todoForm.value;
      this.todoService.addTodo(
        formValue.title!,
        formValue.description || undefined,
        formValue.priority as Todo['priority']
      );
      
      this.resetForm();
      this.showForm.set(false);
      this.isSubmitting.set(false);
    }
  }

  resetForm(): void {
    this.todoForm.reset({
      title: '',
      description: '',
      priority: 'medium'
    });
  }

  protected isFieldInvalid(fieldName: string): boolean {
    const field = this.todoForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
}
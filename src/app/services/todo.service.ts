import { Injectable, signal, computed } from '@angular/core';
import { Todo, TodoFilter } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private readonly _todos = signal<Todo[]>([
    {
      id: 1,
      title: 'Imparare Angular',
      description: 'Completare il tutorial di Angular',
      completed: false,
      createdAt: new Date(),
      priority: 'high'
    },
    {
      id: 2,
      title: 'Costruire un\'app Todo',
      description: 'Creare un\'applicazione Todo con Angular',
      completed: false,
      createdAt: new Date(),
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Pubblicare in Produzione',
      description: 'Distribuire l\'applicazione su un server',
      completed: false,
      createdAt: new Date(Date.now() - 86400000), // 1 giorno fa
      priority: 'low'
    },
    {
      id: 4,
      title: 'Deploy in Produzione',
      description: 'Pubblicare l\'applicazione su un server',
      completed: false,
      createdAt: new Date(),
      priority: 'medium'
    }
  ]);

  private readonly _filter = signal<TodoFilter>({ status: 'all' });

  // Computed signals per dati derivati
  public readonly todos = this._todos.asReadonly();
  public readonly filter = this._filter.asReadonly();

  public readonly filteredTodos = computed(() => {
    const todos = this._todos();
    const filter = this._filter();

    let filtered = todos;

    // Filtra per stato
    if (filter.status === 'pending') {
      filtered = filtered.filter(todo => !todo.completed);
    } else if (filter.status === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    }

    // Filtra per priorità

    if (filter.priority) {
      filtered = filtered.filter(todo => todo.priority === filter.priority);
    }

    return filtered;
  });

  public readonly todoStats = computed(() => {
    const todos = this._todos();
    return {
      total: todos.length,
      completed: todos.filter(t => t.completed).length,
      pending: todos.filter(t => !t.completed).length,
      high: todos.filter(t => t.priority === 'high').length,
      medium: todos.filter(t => t.priority === 'medium').length,
      low: todos.filter(t => t.priority === 'low').length
    };
  });


  // Metodo per aggiungere un nuovo Todo
  addTodo(title: string, description?: string, priority: Todo['priority'] = 'medium'): void {
    const newTodo: Todo = {
      id: this._todos.length + 1, // Genera un nuovo ID basato sulla lunghezza dell'array
      title: title.trim(),
      description: description?.trim() || '',
      completed: false,
      createdAt: new Date(),
      priority
    };

    this._todos.update(todos => [...todos, newTodo]);
  }

  // Metodo per segnare un Todo come completato o non completato
  toggleTodo(id: number): void {
      this._todos.update(todos => 
        todos.map(todo => 
          todo.id === id ? { ...todo, completed: !todo.completed } : todo)
      );
  }

  // Metodo per eliminare un Todo
  deleteTodo(id: number): void {
    this._todos.update(todos => todos.filter(todo => todo.id !== id));
  }
  // Metodo per aggiornare un Todo
  updateTodo(id: number, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>): void {
    this._todos.update(todos => 
      todos.map(todo => 
        todo.id === id ? { ...todo, ...updates } : todo)
    );
  }

  setFilter(filter: TodoFilter): void {
    this._filter.set(filter);
  }
  clearCompleted(): void {
    this._todos.update(todos => todos.filter(todo => !todo.completed));
  }
}

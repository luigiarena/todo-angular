import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  private todos: Todo[] = [
    {
      id: 1,
      title: 'Imparare Angular',
      description: 'Completare il tutorial di Angular',
      completed: false,
      createdAt: new Date(),
    },
    {
      id: 2,
      title: 'Costruire un\'app Todo',
      description: 'Creare un\'applicazione Todo con Angular',
      completed: false,
      createdAt: new Date(),
    },
    {
      id: 3,
      title: 'Pubblicare in Produzione',
      description: 'Distribuire l\'applicazione su un server',
      completed: false,
      createdAt: new Date(),
    }
    {
      id: 3,
      title: 'Deploy in Produzione',
      description: 'Pubblicare l\'applicazione su un server',
      completed: false,
      createdAt: new Date(),
    }
  ];

  private todosSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>(this.todos);
  public todos$: Observable<Todo[]> = this.todosSubject.asObservable();

  constructor() { }

  // Metodo per ottenere la lista dei Todo
  getTodos(): Observable<Todo[]> {
    return this.todos$;
  }
  // Metodo per aggiungere un nuovo Todo
  addTodo(title: string, description: string): void {
    const newTodo = {
      id: this.todos.length + 1, // Genera un nuovo ID basato sulla lunghezza dell'array
      title,
      description,
      completed: false,
      createdAt: new Date()
    };
    this.todos.push(newTodo);
    this.todosSubject.next(this.todos);
  }

  // Metodo per segnare un Todo come completato o non completato
  toggleTodo(id: number): void {
      const todo = this.todos.find(t => t.id === id);
      if (todo) {
        todo.completed = !todo.completed;
        this.todosSubject.next(this.todos);
      }
    }

  // Metodo per eliminare un Todo
  deleteTodo(id: number): void {
    this.todos = this.todos.filter(t => t.id !== id);
    this.todosSubject.next(this.todos);
  }
}

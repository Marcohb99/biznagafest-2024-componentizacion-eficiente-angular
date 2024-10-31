import {Component, OnInit, ViewChildren} from '@angular/core';
import {Todo} from '../models/todo';
import {FormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';
import {tick} from '@angular/core/testing';
import {UserFilterComponent} from '../components/user-filter/user-filter.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    UserFilterComponent
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {
  protected users: string[] = ['Manu', 'Cris', 'Bob'];
  protected selectedUser: string = '';
  protected filter: string = '';
  protected newTodo: string = '';
  protected todos: Todo[] = [];

  ngOnInit() {
    this.fetchTodos();
  }

  async fetchTodos() {
    try {
      const response = await fetch(`http://localhost:3000/todos?user=${this.selectedUser}&filter=${this.filter}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const {status, data} = await response.json();
      this.todos = status ? data : [];
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }

  async addTodo(newTodo: string) {
    if (!newTodo.trim()) return;
    try {
      const response = await fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: newTodo,
          user: '',
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const {status} = await response.json();

      if (status) {
        this.newTodo = '';
        await this.fetchTodos();
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }

  async toggleCompleted(todo: Todo) {
    try {
      const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const {status} = await response.json();

      if (status) {
        this.fetchTodos();
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  }
  async updateText(todo: Todo) {
    try {
      const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: todo.text,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const {status} = await response.json();

      if (status) {
        this.fetchTodos();
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  }
  async updateUser(todo: Todo, user: string) {
    if (user === todo.user) return;
    try {
      const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: user,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const {status} = await response.json();

      if (status) {
        await this.fetchTodos();
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  }
  async deleteTodo(id: number) {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const {status} = await response.json();
      if (status) {
        this.fetchTodos();
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }
  startEdit(index: number) {
    this.todos[index].editing = true;
    setTimeout(() => {
        document.getElementById('editInput'+index)?.focus()
      },
      1
    )
  }
  finishEdit(index: number, todo: Todo, newName: string) {
    this.todos[index].editing = false;
    if (this.todos[index].text.trim() === '') {
      this.deleteTodo(todo.id);
      return;
    }
    const newTodo = {...todo, text: newName};
    this.updateText(newTodo);
  }

  fetchTodosByUser(user: string) {
    this.selectedUser = user;
    this.fetchTodos();
  }

  fetchTodosByFilter(filter: string) {
    this.filter = filter;
    this.fetchTodos();
  }
}

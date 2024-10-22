import { ref, watch, onMounted, type Ref } from 'vue';
import { type Todo } from '@/types/Todo';

export default function useTodosNonOptimized(selectedUser: Ref<string>, filter: Ref<string>) {
  const todos = ref<Todo[]>([]);

  const fetchTodos = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/todos?user=${selectedUser.value}&filter=${filter.value}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const { status, data } = await response.json();
      todos.value = status ? data : [];
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async (text: string) => {
    if (!text.trim()) return;
    try {
      const response = await fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, user: '' }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const { status } = await response.json();
      if (status) {
        fetchTodos();
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleCompleted = async (todo: Todo) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const { status } = await response.json();
      if (status) {
        fetchTodos();
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const updateText = async (todo: Todo, newText: string) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newText }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const { status } = await response.json();
      if (status) {
        fetchTodos();
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const updateUser = async (todo: Todo, user: string) => {
    if (user === todo.user) return;
    try {
      const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const { status } = await response.json();
      if (status) {
        fetchTodos();
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const { status } = await response.json();
      if (status) {
        fetchTodos();
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  watch([selectedUser, filter], () => {
    fetchTodos();
  });

  onMounted(() => {
    fetchTodos();
  });

  return {
    todos,
    fetchTodos,
    addTodo,
    toggleCompleted,
    updateText,
    updateUser,
    deleteTodo,
  };
}

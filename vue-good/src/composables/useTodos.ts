import { onMounted, type Ref,ref, watch } from 'vue';

import {
  createTodo,
  deleteTodo as deleteTodoAPI,
  fetchTodos as fetchTodosAPI,
  updateTodo,
} from '@/services/api';
import { type Todo } from '@/types/Todo';

export default function useTodos(selectedUser: Ref<string>, filter: Ref<string>) {
  const todos = ref<Todo[]>([]);

  const fetchTodos = async () => {
    try {
      todos.value = await fetchTodosAPI(selectedUser.value, filter.value);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async (text: string) => {
    if (!text.trim()) return;
    try {
      await createTodo(text);
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const updateTodoField = async (id: number, updates: Partial<Todo>) => {
    try {
      await updateTodo(id, updates);
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const toggleCompleted = (todo: Todo) => {
    updateTodoField(todo.id, { completed: !todo.completed });
  };

  const updateText = (todo: Todo, newText: string) => {
    updateTodoField(todo.id, { text: newText });
  };

  const updateUser = (todo: Todo, user: string) => {
    if (user === todo.user) return;
    updateTodoField(todo.id, { user });
  };

  const deleteTodo = async (id: number) => {
    try {
      await deleteTodoAPI(id);
      fetchTodos();
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

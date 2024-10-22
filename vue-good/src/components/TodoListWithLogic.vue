<template>
  <div class="min-h-screen bg-gray-100 flex justify-center items-start py-12">
    <div class="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
      <h1 class="text-3xl font-bold mb-6 text-gray-900">Lista de tareas (Vue + TypeScript)</h1>

      <div class="mb-6">
        <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <UserFilter :users="users" v-model="selectedUser" />
          <StatusFilter v-model="filter" />
        </div>
      </div>

      <div class="flex flex-row gap-2 items-center">
        <TodoInput @add-todo="addTodo" />
      </div>

      <div class="space-y-3 mt-4">
        <TodoItem
          v-for="(todo) in filteredTodos"
          :key="todo.id"
          :todo="todo"
          :users="users"
          @toggle-completed="toggleCompleted"
          @update-text="updateText"
          @update-user="updateUser"
          @delete-todo="deleteTodo"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { type Todo } from '@/types/Todo';
import TodoInput from './TodoInput.vue';
import TodoItem from './TodoItem.vue';
import UserFilter from './UserFilter.vue';
import StatusFilter from './StatusFilter.vue';

const users = ref<string[]>(['Manu', 'Cris', 'Bob']);
const selectedUser = ref('');
const filter = ref('');

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

const filteredTodos = computed(() => {
  let filtered = todos.value;
  if (filter.value === 'completed') {
    filtered = filtered.filter((todo) => todo.completed);
  } else if (filter.value === 'incomplete') {
    filtered = filtered.filter((todo) => !todo.completed);
  }
  if (selectedUser.value) {
    filtered = filtered.filter((todo) => todo.user === selectedUser.value);
  }
  return filtered;
});

watch([selectedUser, filter], () => {
  fetchTodos();
});

onMounted(() => {
  fetchTodos();
});
</script>

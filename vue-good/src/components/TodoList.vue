<template>
  <div class="min-h-screen bg-gray-100 flex justify-center items-start py-12">
    <div class="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
      <h1 class="text-3xl font-bold mb-6 text-gray-900">Lista de tareas (Vue + TypeScript + Composable)</h1>

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
          v-for="(todo) in todos"
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
import { ref } from 'vue';
import TodoInput from './TodoInput.vue';
import TodoItem from './TodoItem.vue';
import UserFilter from './UserFilter.vue';
import StatusFilter from './StatusFilter.vue';
import useTodosNonOptimized from '@/composables/useTodosNonOptimized';

const users = ref<string[]>(['Manu', 'Cris', 'Bob']);
const selectedUser = ref('');
const filter = ref('');

const {
  todos,
  addTodo,
  toggleCompleted,
  updateText,
  updateUser,
  deleteTodo,
} = useTodosNonOptimized(selectedUser, filter);
</script>

<template>
  <TodoList title="Lista de tareas (Vue + TypeScript + Composable)">
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
  </TodoList>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import StatusFilter from '@/components/filter/StatusFilter.vue';
import UserFilter from '@/components/filter/UserFilter.vue';
import TodoInput from '@/components/todo/TodoInput.vue';
import TodoItem from '@/components/todo/TodoItem.vue';
import TodoList from '@/components/todo/TodoList.vue';
import useTodos from '@/composables/useTodos';

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
} = useTodos(selectedUser, filter);
</script>

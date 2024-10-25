<template>
  <TodoListWithProps title="Lista de tareas (Vue + TypeScript + Prop Composition)"
    :userFilter="userFilterComponent"
    :statusFilter="statusFilterComponent"
    :todoInput="todoInputComponent"
  >

    <p v-if="isLoading" class="text-blue-500 mt-4">Cargando...</p>
    <p v-if="error" class="text-red-500 mt-4">Error: {{ error }}</p>

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
  </TodoListWithProps>
</template>

<script setup lang="ts">
import { computed,ref } from 'vue';

import StatusFilter from '@/components/filter/StatusFilter.vue';
import UserFilter from '@/components/filter/UserFilter.vue';
import TodoInput from '@/components/todo/TodoInput.vue';
import TodoItem from '@/components/todo/TodoItem.vue';
import TodoListWithProps from '@/components/todo/TodoListWithProps.vue';
import useTodos from '@/composables/useTodos';

const users = ref<string[]>(['Manu', 'Cris', 'Bob']);
const selectedUser = ref('');
const filter = ref('');

const userFilterComponent = computed(() => ({
  component: UserFilter,
  props: {
    users: users.value,
    modelValue: selectedUser.value,
  },
}));

const statusFilterComponent = computed(() => ({
  component: StatusFilter,
  props: {
    modelValue: filter.value,
  },
}));

const todoInputComponent = computed(() => ({
  component: TodoInput,
  props: {
    onAddTodo: addTodo,
  },
}));

const {
  todos,
  addTodo,
  toggleCompleted,
  updateText,
  updateUser,
  deleteTodo,
  isLoading,
  error,
} = useTodos(selectedUser, filter);
</script>

<template>
  <div
    class="flex flex-col sm:flex-row items-start sm:items-center bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200"
  >
    <div class="flex items-center flex-grow mr-4 mb-2 sm:mb-0">
      <input
        type="checkbox"
        @change="toggleCompleted"
        :checked="todo.completed"
        class="mr-3 h-5 w-5 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
      />
      <div class="flex-grow">
        <input
          v-if="editing"
          v-model="editText"
          @blur="finishEdit"
          @keyup.enter="finishEdit"
          class="w-full bg-transparent focus:outline-none text-gray-800"
          ref="editInput"
        />
        <span
          v-else
          @click="startEdit"
          :class="{ 'line-through text-gray-400': todo.completed }"
          class="cursor-text"
        >
          {{ todo.text }}
        </span>
      </div>
    </div>
    <div class="flex items-center w-full sm:w-auto justify-between sm:justify-start">
      <select
        @change="changeUser($event)"
        class="w-32 bg-gray-100 text-sm rounded-full px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
        :value="todo.user"
      >
        <option value="">Sin asignar</option>
        <option v-for="user in users" :key="user" :value="user">
          {{ user }}
        </option>
      </select>
      <button
        @click="deleteTodo"
        class="ml-4 text-gray-400 hover:text-red-500 focus:outline-none"
      >
        <!-- SVG del icono de eliminar -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick,ref } from 'vue';

import { type Todo } from '@/types/Todo';

const props = defineProps<{
  todo: Todo;
  users: string[];
}>();

const emit = defineEmits(['toggle-completed', 'update-text', 'update-user', 'delete-todo']);

const editing = ref(false);
const editText = ref(props.todo.text);
const editInput = ref<HTMLInputElement | null>(null);

const startEdit = () => {
  editing.value = true;
  editText.value = props.todo.text;
  nextTick(() => {
    editInput.value?.focus();
  });
};

const finishEdit = () => {
  editing.value = false;
  if (editText.value.trim() === '') {
    emit('delete-todo', props.todo.id);
  } else if (editText.value !== props.todo.text) {
    emit('update-text', props.todo, editText.value);
  }
};

const toggleCompleted = () => {
  emit('toggle-completed', props.todo);
};

const changeUser = (event: Event) => {
  if (!event.target) return;

  const user = event.target instanceof HTMLSelectElement ? event.target.value : null;
  emit('update-user', props.todo, user ?? '');
};

const deleteTodo = () => {
  emit('delete-todo', props.todo.id);
};
</script>

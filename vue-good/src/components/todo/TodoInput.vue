<template>
  <input
    v-model="inputText"
    @keyup.enter="submitTodo"
    placeholder="Añadir nueva tarea..."
    class="w-4/6 md:w-5/6 p-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400"
  />
  <button
    @click="submitTodo"
    class="w-2/6 md:w-1/6 p-2.5 md:p-2 rounded-lg text-sm md:text-base bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
  >
    Añadir
  </button>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const inputText = ref('');
const emit = defineEmits(['add-todo']);

const submitTodo = () => {
  if (inputText.value.trim()) {
    emit('add-todo', inputText.value);
    inputText.value = '';
  }
};
</script>

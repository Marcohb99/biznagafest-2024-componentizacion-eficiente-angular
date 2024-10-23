<template>
  <div class="flex flex-col">
    <label for="user-filter" class="mb-1 text-sm font-medium text-gray-700">Usuario</label>
    <select
      id="user-filter"
      v-model="selectedUser"
      class="w-full sm:w-40 bg-white text-sm rounded-lg px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
    >
      <option value="">Todos</option>
      <option v-for="user in users" :key="user" :value="user">
        {{ user }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  users: string[];
  modelValue: string;
}>();

const emit = defineEmits(['update:modelValue']);

const selectedUser = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value),
});
</script>

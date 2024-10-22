<template>
  <div class="flex flex-col">
    <label for="task-filter" class="mb-1 text-sm font-medium text-gray-700">Estado</label>
    <select
      id="task-filter"
      v-model="selectedFilter"
      class="w-full sm:w-40 bg-white text-sm rounded-lg px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
    >
      <option value="">Todas</option>
      <option value="completed">Completadas</option>
      <option value="incomplete">Incompletas</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits(['update:modelValue']);

const selectedFilter = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value),
});
</script>

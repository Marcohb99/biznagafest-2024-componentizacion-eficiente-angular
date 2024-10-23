<template>
  <div class="flex flex-col">
    <label for="task-filter" class="mb-1 text-sm font-medium text-gray-700">Estado</label>
    <select
      id="task-filter"
      :value="filter"
      @change="$emit('update:filter', $event.target.value)"
      class="w-full sm:w-40 bg-white text-sm rounded-lg px-3 py-2 border border-gray-300"
    >
      <option value="">Todas</option>
      <option value="completed">Completadas</option>
      <option value="incomplete">Incompletas</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'StatusFilter',
  props: {
    filter: String,
  },
};
</script>

<template>
  <div class="flex flex-col">
    <label for="user-filter" class="mb-1 text-sm font-medium text-gray-700">Usuario</label>
    <select
      id="user-filter"
      :value="selectedUser"
      @change="$emit('update:selected-user', $event.target.value)"
      class="w-full sm:w-40 bg-white text-sm rounded-lg px-3 py-2 border border-gray-300"
    >
      <option value="">Todos</option>
      <option v-for="user in users" :key="user" :value="user">
        {{ user }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'UserFilter',
  props: {
    selectedUser: String,
    users: Array,
  },
};
</script>

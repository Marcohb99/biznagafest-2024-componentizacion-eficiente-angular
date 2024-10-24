<template>
  <div class="flex flex-col sm:flex-row items-start sm:items-center bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
    <div class="flex items-center flex-grow mr-4 mb-2 sm:mb-0">
      <input
        type="checkbox"
        @change="$emit('toggle-completed', todo)"
        :checked="todo.completed"
        class="mr-3 h-5 w-5 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
      />
      <div class="flex-grow">
        <input
          v-if="todo.editing"
          v-model="todo.text"
          @blur.stop="finishEdit"
          @keyup.enter="finishEdit"
          class="w-full bg-transparent focus:outline-none text-gray-800"
        />
        <span
          v-else
          @click="$emit('start-edit', index)"
          :class="{ 'line-through text-gray-400': todo.completed }"
          class="cursor-text"
        >
          {{ todo.text }}
        </span>
      </div>
    </div>
    <div class="flex items-center w-full sm:w-auto justify-between sm:justify-start">
      <select
        @change="$emit('update-user', { todo, user: $event.target.value })"
        class="w-32 bg-gray-100 text-sm rounded-full px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
      >
        <option value="" :selected="todo.user === ''">Sin asignar</option>
        <option
          v-for="user in users"
          :key="user"
          :value="user"
          :selected="todo.user === user"
        >
          {{ user }}
        </option>
      </select>
      <button
        @click="$emit('delete-todo', todo.id)"
        class="ml-4 text-gray-400 hover:text-red-500 focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    todo: Object,
    index: Number,
    users: Array,
  },
  methods: {
    finishEdit() {
      this.$emit('finish-edit', { index: this.index, todo: this.todo });
    },
  },
};
</script>

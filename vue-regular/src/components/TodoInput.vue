<template>
  <input
    :value="newTodo"
    @input="$emit('update:new-todo', $event.target.value)"
    @keyup.enter="$emit('add-todo')"
    placeholder="Añadir nueva tarea..."
    class="w-4/6 md:w-5/6 p-2 rounded-lg bg-white border border-gray-300"
  />
  <button
    @click="$emit('add-todo')"
    class="w-2/6 md:w-1/6 p-2.5 md:p-2 rounded-lg bg-blue-500 text-white"
  >
    Añadir
  </button>
</template>

<script>
export default {
  name: 'TodoInput',
  props: {
    newTodo: String,
  },
};
</script>

<template>
  <div class="space-y-3 mt-4">
    <TodoItem
      v-for="(todo, index) in todos"
      :key="index"
      :todo="todo"
      :index="index"
      :users="users"
      @toggle-completed="$emit('toggle-completed', $event)"
      @update-text="$emit('update-text', $event)"
      @update-user="$emit('update-user', $event.todo, $event.user)"
      @delete-todo="$emit('delete-todo', $event)"
      @start-edit="$emit('start-edit', $event)"
      @finish-edit="$emit('finish-edit', $event.index, $event.todo)"
    />
  </div>
</template>

<script>
import TodoItem from './TodoItem.vue';

export default {
  name: 'TodoList',
  components: {
    TodoItem,
  },
  props: {
    todos: Array,
    users: Array,
  },
};
</script>

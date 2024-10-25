<script setup lang="ts">
// import TodoListWithComposable from '@/views/TodoList/TodoListWithComposable.vue';
// import TodoListWithLogic from '@/views/TodoList/TodoListWithLogic.vue';
// import TodoListWithComposition from '@/views/TodoList/TodoListWithComposition.vue';
import TodoListWithPropComposition from '@/views/TodoList/TodoListWithPropComposition.vue';

</script>

<template>
  <div className="min-h-screen w-full bg-gray-100 flex">
    <div className="w-full p-4">
      <!-- <TodoListWithComposable /> -->
      <!-- <TodoListWithComposition /> -->
      <TodoListWithPropComposition />
    </div>
  </div>
</template>

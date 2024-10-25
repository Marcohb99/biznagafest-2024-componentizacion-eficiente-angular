<template>
  <div class="min-h-screen bg-gray-100 flex justify-center items-start py-12">
    <div class="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
      <h1 class="text-2xl font-bold mb-6 text-gray-900">{{ title }}</h1>
      <div v-if="userFilter || statusFilter" class="mb-6">
        <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <component v-if="userFilter" :is="userFilter.component" v-bind="userFilter.props" />
          <component v-if="statusFilter" :is="statusFilter.component" v-bind="statusFilter.props" />
        </div>
      </div>

      <div v-if="todoInput" class="flex flex-row gap-2 items-center">
        <component v-if="todoInput" :is="todoInput.component" v-bind="todoInput.props" />
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string,
  userFilter?: PropType<{ component: unknown; props: unknown }>,
  statusFilter?: PropType<{ component: unknown; props: unknown }>,
  todoInput?: PropType<{ component: unknown; props: unknown }>
}>();
</script>

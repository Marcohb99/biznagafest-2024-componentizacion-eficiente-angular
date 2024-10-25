<template>
  <div class="min-h-screen bg-gray-100 flex justify-center items-start py-12">
    <div class="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
      <h1 class="text-2xl font-bold mb-6 text-gray-900">{{ title }}</h1>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

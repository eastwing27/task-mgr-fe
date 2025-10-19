<script setup lang="ts">
const route = useRoute()
const { id } = route.params
const { data: task, error, pending } = await useGetTask(id as string)
</script>

<template>
  <div>
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else-if="task">
      <h1>{{ task.title }}</h1>
      <p><strong>Status:</strong> {{ task.status }}</p>
      <p v-if="task.description">{{ task.description }}</p>
    </div>
  </div>
</template>

<style scoped>
/* Styles here */
</style>
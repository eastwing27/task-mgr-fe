<script setup lang="ts">
const route = useRoute()
const { id } = route.params
const { data: task, error, pending } = id === "new" 
  ? { data: ref(undefined), error: ref(null), pending: ref(false) }
  : await useGetTask(id as string)
</script>

<template>
  <div>
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>
      <TmTaskForm :task="task" />
    </div>
  </div>
</template>

<style scoped>
/* Styles here */
</style>
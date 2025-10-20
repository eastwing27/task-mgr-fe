<template>
  <div class="row task-line" @click="onclick">
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps<{onclick: () => void}>()
</script>

<style scoped>
.task-line {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: background-color .35s;
  border-top: 1px solid #d1d9e6;
}
.task-line:hover {
  background-color: #c5cee2;
}
</style>
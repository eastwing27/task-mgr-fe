<template>
  <NuxtLink :to="to" class="row link-line">
    <slot />
  </NuxtLink>
</template>

<script lang="ts" setup>
defineProps<{to: string}>()
</script>

<style>
.link-line {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: background-color .35s;
  border-top: 1px solid #d1d9e6;
}
.link-line:hover {
  background-color: #c5cee2;
}
</style>
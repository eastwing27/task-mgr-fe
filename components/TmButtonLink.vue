<template>
  <NuxtLink :to="to" class="nav-button">
    <slot />
  </NuxtLink>
</template>

<script setup>
  defineProps({
    to: {
      type: String,
      required: true
    }
  });
</script>

<style>
  .nav-button {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background: #3b82f6;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 500;
    transition: background-color .35s;
  }

  .nav-button:hover {
    background: #2563eb;
  }
</style>
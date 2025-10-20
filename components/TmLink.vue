<template>
  <NuxtLink 
    :to="to" 
    :class="secondary ? 'btn btn-secondary' : 'btn btn-primary'"
  >
    <slot />
  </NuxtLink>
</template>

<script setup>
  defineProps({
    secondary: {
      type: Boolean,
      default: false
    },
    to: {
      type: String,
      required: true
    }
  });
</script>

<style>

</style>
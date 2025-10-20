<template>
  <button 
    :class="secondary ? 'btn btn-secondary' : 'btn btn-primary'" 
    @click="onclick"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
  defineProps<{
    secondary?: boolean;
    onclick?: (event: Event) => void;
  }>();
</script>

<style>

</style>
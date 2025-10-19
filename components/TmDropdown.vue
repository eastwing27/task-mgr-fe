<template>
  <div>
    <select @change="onSelect(($event.target as HTMLSelectElement)?.value)">
      <option 
        v-for="item in items" 
        :key="item.value ?? 'emptyVal'" 
        :value="item.value"
      >
        {{ item.label }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  items: Array<{ label: string; value: string|undefined }>;
  onSelect: (value: string|undefined) => void;
}>();
</script>

<style>

</style>
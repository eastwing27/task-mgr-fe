<template>
  <div>
    <select :value="selectedValue" @change="handleChange">
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
const props = defineProps<{
  initialSelection?: string;
  items: Array<{ label: string; value: string|undefined }>;
  onSelect: (value: string|undefined) => void;
}>()

// Внутреннее состояние, инициализированное из initialSelection
const selectedValue = ref(props.initialSelection)

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const value = target.value
  
  // Обновляем внутреннее состояние
  selectedValue.value = value
  
  // Вызываем callback как раньше
  props.onSelect(value || undefined)
}
</script>

<style>

</style>
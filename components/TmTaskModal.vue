<template>
  <TmModal 
    :is-open="isOpen" 
    :title="modalTitle" 
    @close="$emit('close')"
  >
    <TmTaskForm 
      :task="task" 
      :after-submit="() => {$emit('close'); onSubmit?.()}"
    />
  </TmModal>
</template>

<script setup lang="ts">
interface Emits {
  close: []
}

const props = defineProps<{
  isOpen: boolean
  task?: TaskDTO
  onSubmit?: () => void
}>()

const emit = defineEmits<Emits>()

const modalTitle = computed(() => 
  props.task ? `Edit Task: ${props.task.title}` : 'Create New Task'
)

</script>
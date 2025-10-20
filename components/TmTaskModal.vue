<template>
  <TmModal 
    :is-open="isOpen" 
    :title="modalTitle" 
    @close="$emit('close')"
  >
    <TmTaskForm 
      :task="task" 
      @submit="handleSubmit" 
      @cancel="$emit('close')" 
    />
  </TmModal>
</template>

<script setup lang="ts">
interface Props {
  isOpen: boolean
  task?: TaskDTO
}

interface Emits {
  close: []
  submit: [task: NewTaskDTO|UpdateTaskDTO]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const modalTitle = computed(() => 
  props.task ? `Edit Task: ${props.task.title}` : 'Create New Task'
)

const handleSubmit = (taskData: NewTaskDTO|UpdateTaskDTO) => {
  emit('submit', taskData)
  emit('close')
}
</script>
<template>
  <div class="form">
    <div class="form-field">
      <label for="title">Title:</label>
      <input
        v-model="editTask.title"
        type="text"
        placeholder="Task Title"
        required
        class="form-input"
      />
    </div>
    <div class="form-field">
      <label for="description">Description:</label>
      <textarea
        v-model="editTask.description"
        placeholder="Task Description"
        class="form-textarea"
      />
    </div>
    <div class="form-field">
      <label for="status">Task Status:</label>
      <TmDropdown
        :initial-selection="editTask.status"
        :items="[
          { label: 'New/Pending', value: 'new' },
          { label: 'In Progress', value: 'inProgress' },
          { label: 'Completed', value: 'completed' },
          { label: 'Cancelled', value: 'cancelled' },
        ]"
        :onSelect="handleStatusChange"
      />
    </div>
    <div class="form-field">
      <label for="deadline">Due Date:</label>
      <input
        v-model="deadlineString"
        type="datetime-local"
        class="form-input"
      />
    </div>
    <TmButton :onclick="submit">Save Task</TmButton>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  task?: TaskDTO;
  afterSubmit?: () => void;
}>()

const editTask = ref<EditTaskDTO>({
  title: '',
  description: '',
  status: 'new',
  deadline: undefined,
})

watch(() => props.task, (newTask) => {
  if (!newTask) return;
  
  editTask.value = {
    title: newTask.title || '',
    description: newTask.description || '',
    status: newTask.status || 'new',
    deadline: newTask.deadline || undefined,
  }
  
}, { immediate: true })

const handleStatusChange = (value: string | undefined) => {
  editTask.value.status = (value || 'new') as TaskStatus
}

const submit = async () => {
  if (!props.task) {
    await useCreateTask({
      title: editTask.value.title ?? "New Task",
      description: editTask.value.description,
      deadline: editTask.value.deadline,
    })
  }
  else {
    await usePatchTask(props.task.id, {
      id: props.task.id,
      title: editTask.value.title,
      description: editTask.value.description,
      status: editTask.value.status,
      deadline: editTask.value.deadline,
    })
  }
  
  if (props.afterSubmit) {
    props.afterSubmit()
  }
}

const deadlineString = computed({
  get: () => {
    if (!editTask.value.deadline) return ''
    const date = new Date(editTask.value.deadline)
    return date.toISOString().slice(0, 16) // YYYY-MM-DDTHH:mm format
  },
  set: (value: string) => {
    editTask.value.deadline = value ? new Date(value) : undefined
  }
})
</script>

<style scoped>

.form-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.form {
  textarea {
    min-height: 100px;
    resize: none;
  }
}

</style>
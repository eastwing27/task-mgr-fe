<template>
  <div>
    <div class="h-row">
      <h1>Tasks</h1>
      <TmButton :onclick="openCreateModal">Add New</TmButton>
    </div>
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else-if="tasks">
      <div class="title row">
        <SortableHeader title="ID" field="id" />
        <strong>Title</strong>
        <TmDropdown :items="[
          { label: 'All Statuses', value: '' },
          { label: 'New/Pending', value: 'new' },
          { label: 'In Progress', value: 'inProgress' },
          { label: 'Completed', value: 'completed' },
          { label: 'Cancelled', value: 'cancelled' },
        ]" :onSelect="(value) => statusFilter = value || undefined" />
        <SortableHeader title="Deadline" field="deadline" />
      </div>
      <TmRowLink v-for="task in tasks" :key="task.id" :to="`/tasks/${task.id}`">
        <p>#{{ task.id }}</p>
        <p>{{ task.title }}</p>
        <p class="status-p">{{ splitCamelCase(task.status) }}</p>
        <p>{{ task.deadline ? new Date(task.deadline).toLocaleString() : 'No deadline' }}</p>
      </TmRowLink>
    </div>
    
    <TmTaskModal 
      :is-open="createModal.isOpen.value"
      @close="createModal.close"
      @submit="handleCreateTask"
    />
  </div>
</template>

<script lang="ts" setup>
import TmDropdown from '~/components/TmDropdown.vue';
import TmRowLink from '~/components/TmRowLink.vue';
import TmTaskModal from '~/components/TmTaskModal.vue';

const { data: tasks, error, pending, refresh } = await useGetTasks()

const createModal = useModal()
const openCreateModal = () => createModal.open()

const handleCreateTask = async (taskData: NewTaskDTO) => {
  try {
    await useCreateTask(taskData)
    await refresh()
  } catch (error) {
    console.error('Failed to create task:', error)
  }
}

const statusFilter = ref<string | undefined>(undefined);
const sortBy = ref<string>("id");
const sortOrder = ref<'asc' | 'desc'>('asc');

watch([statusFilter, sortBy, sortOrder], async ([newStatus, newSortBy, newSortOrder]) => {
  const { data } = await useGetTasks({ 
    status: newStatus,
    sortBy: `${newSortBy}:${newSortOrder}`,
  })
  tasks.value = data.value
}, { immediate: true })

const toggleSort = (field: string) => {
  if (sortBy.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = field
    sortOrder.value = 'asc'
  }
}

const SortableHeader = defineComponent({
  props: {
    title: String,
    field: String
  },
  setup(props) {
    const handleClick = () => {
      toggleSort(props.field as string)
    }
    
    const isActive = computed(() => sortBy.value === props.field)
    
    return () => h('strong', 
      { 
        onClick: handleClick,
        style: { cursor: 'pointer', userSelect: 'none' }
      },
      [
        props.title,
        isActive.value ? h('span', 
          sortOrder.value === 'asc' ? ' ▲' : ' ▼'
        ) : ''
      ]
    )
  }
})
</script>

<style scoped>
.status-p {
  text-transform: capitalize;
}

.title {
  padding-bottom: 1dvh;
}

.h-row {
  display: flex;
  gap: 1dvw;

  button {
    height: fit-content;
    margin: auto 0;
  }
}
</style>
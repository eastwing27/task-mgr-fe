<template>
  <div>
    <h1>Tasks</h1>
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
  </div>
</template>

<script lang="ts" setup>
import TmDropdown from '~/components/TmDropdown.vue';
import TmRowLink from '~/components/TmRowLink.vue';

const { data: tasks, error, pending } = await useGetTasks()

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

const splitCamelCase = (str: string) => {
  return str.replace(/([a-z])([A-Z])/g, '$1 $2')
}

// Локальный компонент
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
</style>
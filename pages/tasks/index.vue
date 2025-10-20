S<template>
  <div>
    <div class="h-row">
      <h1>Tasks</h1>
      <TmButton :onclick="() => openModal()">Add New</TmButton>
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
      <TmRowLink v-for="task in tasks" :key="task.id" :onclick="() => openModal(task)">
        <p>#{{ task.id }}</p>
        <p>{{ task.title }}</p>
        <p class="status-p">{{ splitCamelCase(task.status) }}</p>
        <p>{{ task.deadline ? new Date(task.deadline).toLocaleString() : 'No deadline' }}</p>
      </TmRowLink>
    </div>
    
    <TmTaskModal 
      :is-open="taskModal.isOpen.value"
      :task="editingTask"
      :on-submit="() => refresh()"
      @close="taskModal.close"
    />
  </div>
</template>

<script lang="ts" setup>
import TmDropdown from '~/components/TmDropdown.vue';
import TmRowLink from '~/components/TmRowLink.vue';
import TmTaskModal from '~/components/TmTaskModal.vue';

const statusFilter = ref<string | undefined>(undefined);
const sortBy = ref<string>("id");
const sortOrder = ref<'asc' | 'desc'>('asc');

const filters = computed(() => ({
  status: statusFilter.value,
  sortBy: sortBy.value ? `${sortBy.value}:${sortOrder.value}` : undefined
}))

const { data: tasks, error, pending, refresh } = await useGetTasks(filters)

const taskModal = useModal()
const editingTask = ref<TaskDTO | undefined>(undefined)

const openModal = async (taskBrief?: TaskBriefDTO) => {
  if (taskBrief) {
    try {
      const { data: fullTask } = await useGetTask(taskBrief.id.toString())
      editingTask.value = fullTask.value
    } catch (error) {
      console.error('Failed to load task:', error)
      return
    }
  } else {
    editingTask.value = undefined
  }
  taskModal.open()
}

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
        style: { cursor: 'pointer', userSelect: 'none', color: '#007b99' }
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
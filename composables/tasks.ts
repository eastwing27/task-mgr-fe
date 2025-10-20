
const useApiFetch = <T>(url: string, options: any = {}) => {
  const config = useRuntimeConfig()
  return useFetch<T>(url, {
    baseURL: config.public.apiBase,
    ...options
  })
}

export const useGetTask = (id: string) => 
  useApiFetch<TaskDTO>(`task/${id}`);

export const useGetTasks = (filters: MaybeRefOrGetter<{ status?: string, sortBy?: string }> = {}) => {
  return useApiFetch<TaskBriefDTO[]>('task', {
    query: filters,
  })
};

export const usePatchTask = (id: number, data: UpdateTaskDTO) => {
  return useApiFetch<TaskDTO>(`task/${id}`, {
    method: 'PATCH',
    body: data,
  })
};

export const useCreateTask = (data: NewTaskDTO) => {
  return useApiFetch<TaskDTO>('task', {
    method: 'POST',
    body: data,
  })
};

export const useDeleteTask = (id: number) => {
  return useApiFetch<void>(`task/${id}`, {
    method: 'DELETE',
  })
}

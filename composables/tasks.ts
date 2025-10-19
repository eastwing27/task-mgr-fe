
const useApiFetch = <T>(url: string, options: any = {}) => {
  const config = useRuntimeConfig()
  return useFetch<T>(url, {
    baseURL: config.public.apiBase,
    ...options
  })
}

export const useGetTask = (id: string) => 
  useApiFetch<TaskDTO>(`task/${id}`)

export const useGetTasks = (filters: MaybeRefOrGetter<{ status?: string, sortBy?: string }> = {}) => {
  return useApiFetch<TaskBriefDTO[]>('task', {
    query: filters,
  })
}
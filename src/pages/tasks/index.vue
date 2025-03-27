<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>

<script lang="ts" setup>
import DataTable from '@/components/ui/data-table/DataTable.vue'
import { tasksQuerys } from '@/utils/supaQueries.ts'
import type { TaskWithProjects } from '@/utils/supaQueries.ts'
import { columns } from '@/utils/tableColumns/taskColumns'
const { page } = usePageStore()
page.title = 'my tasks'

const tasks = ref<TaskWithProjects | null>(null)
const fetchTasks = async () => {
  const { data, error, status } = await tasksQuerys
  if (error) useErrorStore().setError({ error, customCode: status })
  tasks.value = data
}
await fetchTasks()
</script>

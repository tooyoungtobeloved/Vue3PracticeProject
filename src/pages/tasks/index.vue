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
  const { data, error } = await tasksQuerys
  if (error) console.error(error)
  tasks.value = data
}
await fetchTasks()
</script>

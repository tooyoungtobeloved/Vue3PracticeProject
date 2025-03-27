<template>
  <RouterLink to="/">HOMEVIEW</RouterLink>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>

<script lang="ts" setup>
import DataTable from '@/components/ui/data-table/DataTable.vue'
import { RouterLink } from 'vue-router'
import { projectQuerys } from '@/utils/supaQueries.ts'
import type { Projects } from '@/utils/supaQueries.ts'
import { columns } from '@/utils/tableColumns/projectColumns'
const { page } = usePageStore()
page.title = 'projects'

const projects = ref<Projects | null>(null)

const fetchProjects = async () => {
  const { data, error, status } = await projectQuerys
  if (error) useErrorStore().setError({ error, customCode: status })
  projects.value = data
}
await fetchProjects()
</script>

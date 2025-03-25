<template>
  <RouterLink to="/">HOMEVIEW</RouterLink>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>

<script lang="ts" setup>
import type { ColumnDef } from '@tanstack/vue-table'
import type { Tables } from '../../../database/types.ts'
import { supabase } from '@/lib/supabaseClient.ts'
import DataTable from '@/components/ui/data-table/DataTable.vue'
import { RouterLink } from 'vue-router'
const { page } = usePageStore()
page.title = 'projects'
const columns: ColumnDef<Tables<'projects'>>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        {
          to: `/projects/${row.original.slug}`,
          class: 'text-left font-medium hover:bg-muted block w-full',
        },
        () => row.getValue('name'),
      )
    },
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('status'))
    },
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-medium' },
        (row.getValue('collaborators') as []).join(','),
      )
    },
  },
]
const projects = ref<Tables<'projects'>[] | null>(null)

const fetchProjects = async () => {
  const { data, error } = await supabase.from('projects').select()
  console.log(data)
  if (error) console.error(error)
  projects.value = data
}
await fetchProjects()
</script>

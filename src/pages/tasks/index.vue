<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>

<script lang="ts" setup>
import DataTable from '@/components/ui/data-table/DataTable.vue'
import type { Tables } from '../../../database/types.ts'
import { supabase } from '@/lib/supabaseClient.ts'
import type { ColumnDef } from '@tanstack/vue-table'
import { RouterLink } from 'vue-router'
import type { QueryData } from '@supabase/supabase-js'
const { page } = usePageStore()
page.title = 'my tasks'
const columns: ColumnDef<TaskWithProjects[0]>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        { to: `/tasks/${row.original.id}`, class: 'text-left font-medium' },
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
    accessorKey: 'due_date',
    header: () => h('div', { class: 'text-left' }, 'Due Date'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('due_date'))
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
  {
    accessorKey: 'created_at',
    header: () => h('div', { class: 'text-left' }, 'Created At'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-medium' },
        new Date(row.getValue('created_at')).toLocaleDateString(),
      )
    },
  },
  {
    accessorKey: 'projects',
    header: () => h('div', { class: 'text-left' }, 'Project'),
    cell: ({ row }) => {
      return row.original.projects
        ? h(
            RouterLink,
            { to: `/projects/${row.original.projects.slug}`, class: 'text-left font-medium' },
            row.original.projects.name,
          )
        : null
    },
  },
]
const tasks = ref<TaskWithProjects | null>(null)
const taskQuerys = supabase.from('tasks').select(`*, projects(id, name, slug)`)
type TaskWithProjects = QueryData<typeof taskQuerys>
const fetchTasks = async () => {
  const { data, error } = await taskQuerys
  if (error) console.error(error)
  tasks.value = data
}
await fetchTasks()
</script>

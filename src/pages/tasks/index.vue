<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>

<script lang="ts" setup>
import DataTable from '@/components/ui/data-table/DataTable.vue'
import type { Tables } from '../../../database/types.ts'
import { supabase } from '@/lib/supabaseClient.ts'
import type { ColumnDef } from '@tanstack/vue-table'
import { RouterLink } from 'vue-router'

const columns: ColumnDef<Tables<'tasks'>>[] = [
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
    accessorKey: 'project_id',
    header: () => h('div', { class: 'text-left' }, 'Project Id'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('project_id'))
    },
  },
]
const tasks = ref<Tables<'tasks'>[] | null>(null)
const fetchTasks = async () => {
  const { data, error } = await supabase.from('tasks').select()
  if (error) console.error(error)
  tasks.value = data
}
await fetchTasks()
</script>

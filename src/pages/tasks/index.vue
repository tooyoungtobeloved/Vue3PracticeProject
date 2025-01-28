<template>
  <span>tasks</span>
  <RouterLink to="/">HOMEVIEW</RouterLink>
  <ul>
    <li v-for="task in tasks" :key="task.id">
      {{ task.name }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { Tables } from '../../../database/types.ts'
import { supabase } from '@/lib/supabaseClient.ts'
const tasks = ref<Tables<'tasks'>[] | null>(null)
onMounted(async () => {
  const { data, error } = await supabase.from('tasks').select()
  console.log(data)
  if (error) console.error(error)
  tasks.value = data
})
</script>

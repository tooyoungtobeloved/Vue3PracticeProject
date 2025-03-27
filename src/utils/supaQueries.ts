import { supabase } from '@/lib/supabaseClient'
import type { QueryData } from '@supabase/supabase-js'

export const tasksQuerys = supabase.from('tasks').select(`*, projects(id, name, slug)`)

export type TaskWithProjects = QueryData<typeof tasksQuerys>

export const projectQuerys = supabase.from('projects').select()
export type Projects = QueryData<typeof projectQuerys>

export const projectQuery = (slug: string) =>
  supabase
    .from('projects')
    .select(
      `*,
    tasks (
      id,
      name,
      status,
      due_date
    )
  `,
    )
    .eq('slug', slug)
    .single()
export type Project = QueryData<ReturnType<typeof projectQuery>>

export const taskQuery = (id: string) =>
  supabase
    .from('tasks')
    .select(
      `*,
  projects(
    id,
    name,
    slug
  )
  `,
    )
    .eq('id', id)
    .single()
export type Task = QueryData<ReturnType<typeof taskQuery>>

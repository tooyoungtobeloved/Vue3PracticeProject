import { supabase } from '@/lib/supabaseClient'
import type { QueryData } from '@supabase/supabase-js'

export const taskQuerys = supabase.from('tasks').select(`*, projects(id, name, slug)`)

export type TaskWithProjects = QueryData<typeof taskQuerys>

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

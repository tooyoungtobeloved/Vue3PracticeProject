import type { User, Session } from '@supabase/supabase-js'
import type { Tables } from '../../database/types'
import { profileQuery } from '@/utils/supaQueries'

export const useAuthStore = defineStore('auth-store', () => {
  const user = ref<null | User>(null)
  const profile = ref<Tables<'profiles'> | null>(null)

  const setProfile = async () => {
    if (!user.value) {
      profile.value = null
      return
    }
    if (!profile.value || profile.value.id !== user.value.id) {
      const { data } = await profileQuery(user.value.id)
      profile.value = data || null
    }
  }
  const setAuth = (userSession: null | Session = null) => {
    if (!userSession) {
      user.value = null
      return
    }
    user.value = userSession.user
  }

  return {
    user,
    profile,
    setAuth,
  }
})

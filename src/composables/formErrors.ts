import type { AuthError } from '@supabase/supabase-js'
import { server } from 'typescript'

export const useFormErrors = () => {
  const serverError = ref('')

  const handleServerError = (error: AuthError) => {
    serverError.value =
      error.message === 'Invalid login credentials' ? 'Invalid email or password' : error.message
  }

  return {
    serverError,
    handleServerError,
  }
}

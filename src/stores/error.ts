import type { CustomError, CustomPostgrestError } from '@/types/Error'
import type { PostgrestError } from '@supabase/supabase-js'
export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<null | CustomError | CustomPostgrestError>(null)
  const isCustomError = ref(false)
  const setError = ({
    error,
    customCode,
  }: {
    error: string | PostgrestError | Error
    customCode?: number
  }) => {
    if (typeof error === 'string') isCustomError.value = true
    if (typeof error === 'string' || error instanceof Error) {
      activeError.value = typeof error === 'string' ? Error(error) : error
      activeError.value.customCode = customCode || 500
      return
    }
    activeError.value = error
    activeError.value.status = customCode || 500
  }
  const clearError = () => {
    activeError.value = null
    isCustomError.value = false
  }
  return {
    clearError,
    isCustomError,
    activeError,
    setError,
  }
})

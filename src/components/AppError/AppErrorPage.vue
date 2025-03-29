<script lang="ts" setup>
const router = useRouter()
const errorStore = useErrorStore()
const error = ref(errorStore.activeError)
const customCode = ref(0)
router.afterEach(() => {
  errorStore.clearError()
})
const message = ref('')
const details = ref('')
const hint = ref('')
const code = ref('')
const statusCode = ref(0)
const ErrorTemplate = import.meta.env.DEV
  ? defineAsyncComponent(() => import('./AppErrorDevSection.vue'))
  : defineAsyncComponent(() => import('./AppErrorProdSection.vue'))

if (error.value) {
  if ('customCode' in error.value) {
    message.value = error.value.message
    customCode.value = error.value.customCode ?? 0
  } else if ('code' in error.value) {
    message.value = error.value.message
    details.value = error.value.details
    hint.value = error.value.hint
    code.value = error.value.code
    statusCode.value = error.value.status ?? 0
  }
}
</script>
<template>
  <section
    class="mx-auto flex justify-center items-center flex-1 p-10 text-center -mt-20 min-h-[90vh]"
  >
    <ErrorTemplate
      :isCustomError="errorStore.isCustomError"
      :message
      :customCode
      :code
      :statusCode
      :hint
      :details
    />
  </section>
</template>

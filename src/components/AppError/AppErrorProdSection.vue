<template>
  <div>
    <div class="flex flex-col items-center justify-center gap-5">
      <Icon icon="lucide:triangle-alert" class="text-7xl text-destructive" />
      <h1 class="font-extrabold text-7xl text-secondary">{{ error.code }}</h1>
      <p class="text-3xl font-extrabold text-primary">
        {{ error.msg }}
      </p>
      <div class="flex flex-col items-center justify-center gap-5 mt-6 font-light">
        <p class="my-2 text-lg text-muted-foreground">
          You'll find lots to explore on the home page.
        </p>
        <RouterLink to="/">
          <Button class="max-w-36"> Back to homepage </Button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
const props = defineProps<{
  message: string
  statusCode: number
  customCode: number
  isCustomError: boolean
}>()
const error = ref({
  code: 500,
  msg: 'Something went wrong',
})
if (props.isCustomError) {
  error.value.code = props.customCode
  error.value.msg = props.message
}
if (props.statusCode === 406) {
  error.value.code = 404
  error.value.msg = "Sorry, we couldn't find the page you were looking for"
}
</script>

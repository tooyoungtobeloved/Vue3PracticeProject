<template>
  <div>
    <div class="flex flex-col items-center justify-center gap-5">
      <Icon icon="lucide:triangle-alert" class="text-7xl text-destructive" />
      <h1 class="font-extrabold text-7xl text-secondary">{{ customCode || code }}</h1>
      <p class="font-extrabold text-7xl text-secondary" v-if="statusCode">
        Status code: {{ statusCode }}
      </p>
      <p class="text-3xl font-extrabold text-primary">
        {{ message }}
      </p>
      <p v-if="hint">{{ hint }}</p>
      <p v-if="details">{{ details }}</p>
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
defineProps<{
  code: string
  message: string
  hint?: string | null
  details: string
  statusCode?: number
  customCode?: number
}>()
</script>

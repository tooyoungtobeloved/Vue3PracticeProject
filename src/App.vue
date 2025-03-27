<script setup lang="ts">
import AuthLayout from '@/components/Layout/main/AuthLayout.vue'
import { useErrorStore } from './stores/error'
const { activeError } = storeToRefs(useErrorStore())
import AppErrorPage from './components/AppError/AppErrorPage.vue'
</script>

<template>
  <AuthLayout>
    <AppErrorPage v-if="activeError" />
    <RouterView v-else v-slot="{ Component, route }">
      <template v-if="Component">
        <Suspense :timeout="0">
          <component :is="Component" :key="route.name" />
          <template #fallback> 正在加载... </template>
        </Suspense>
      </template>
    </RouterView>
  </AuthLayout>
</template>

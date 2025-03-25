<script setup lang="ts">
import AuthLayout from '@/components/Layout/main/AuthLayout.vue'
</script>

<template>
  <AuthLayout>
    <RouterView v-slot="{ Component, route }">
      <template v-if="Component">
        <Suspense :timeout="0">
          <component :is="Component" :key="route.name" />
          <template #fallback> 正在加载... </template>
        </Suspense>
      </template>
    </RouterView>
  </AuthLayout>
</template>

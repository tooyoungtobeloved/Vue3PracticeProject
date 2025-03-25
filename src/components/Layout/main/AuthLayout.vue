<script setup lang="ts">
import TopNavbar from '@/components/Layout/TopNavbar.vue'
import SiderBar from '@/components/Layout/SiderBar.vue'

const { page } = storeToRefs(usePageStore())
</script>

<template>
  <SiderBar />
  <div class="flex flex-col lg:ml-52 ml-16 transition-[margin]">
    <TopNavbar />
    <main class="flex flex-col felx-1 gap-4 p-4 lg:gap-6 lg:p-6">
      <div class="flex items-center">
        <h1 class="text-lg font-semibold md:text-2xl">{{ page.title }}</h1>
      </div>
      <slot></slot>
    </main>
  </div>
</template>

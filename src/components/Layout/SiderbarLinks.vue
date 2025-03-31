<template>
  <template v-for="link in links" :key="link.title">
    <RouterLink
      exact-active-class="text-primary bg-muted"
      v-if="link.to"
      :to="link.to"
      class="flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground"
    >
      <Icon :icon="link.icon"></Icon>
      <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
    </RouterLink>
    <div
      @click="emitActionClicked(link.title)"
      v-else
      class="flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground cursor-pointer"
    >
      <Icon :icon="link.icon"></Icon>
      <span class="hidden lg:block text-nowrap"> {{ link.title }}</span>
    </div>
  </template>
</template>
<script lang="ts" setup>
import { Icon } from '@iconify/vue'
interface ILinks {
  title: string
  to?: string
  icon: string
}
const props = defineProps<{
  links: ILinks[]
}>()
const emit = defineEmits<{ actionClicked: [string] }>()
const emitActionClicked = (linkTitle: string) => {
  emit('actionClicked', linkTitle)
}
</script>
<style lang="less" scoped></style>

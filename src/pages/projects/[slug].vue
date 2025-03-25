<template>
  <span>project {{ route.params?.slug }}</span>
  <RouterLink to="/">HOMEVIEW</RouterLink>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

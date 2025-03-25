<template>
  <span>project {{ route.params?.slug }}</span>
  <RouterLink to="/">HOMEVIEW</RouterLink>
</template>

<script lang="ts" setup>
const route = useRoute()
</script>

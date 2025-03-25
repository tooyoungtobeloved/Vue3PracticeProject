<template>
  <div>
    <h1>Home Page</h1>
  </div>
</template>
<script setup lang="ts">
const { page } = usePageStore()
page.title = 'Home Page'
</script>
<style lang="less" scoped></style>

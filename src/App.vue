<template>
  <main>
    <ListWithPagination :list-data="listData" :list-config="listConfig" />
  </main>
</template>

<script setup>
import ListWithPagination from "./components/ListWithPagination.vue";
import listConfig from "./listConfig"
import { generateTestData } from "./utils"
const listData = generateTestData();
</script>
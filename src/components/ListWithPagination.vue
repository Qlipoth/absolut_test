<template>
  <div class="container">
    <h1>Пагинация JSON-данных</h1>

    <ul>
      <li v-for="item in paginatedData" :key="item.id">{{ item.name }}</li>
    </ul>

    <Pagination
        :totalPages="totalPages"
        :currentPage="currentPage"
        :visiblePages="listConfig.visiblePages"
    />
  </div>
</template>

<script setup>
import {computed, ref, toRefs, watch} from "vue";
import { useRoute } from "vue-router";
import Pagination from "./Pagination.vue";


const route = useRoute();
const props = defineProps({
  listData: {
    type: Array,
    default: () => [],
    required: true,
  },
  listConfig: {
    type: Object,
    default: () => {
      return {
        itemsPerPage: 10,
        visiblePages: 3,
      };
    }
  }
});

const { listData, listConfig  } = toRefs(props)
// Текущая страница из URL (по умолчанию 1)
const currentPage = ref(Number(route.query.page) || 1);

// Следим за изменением URL и обновляем currentPage
watch(() => route.query.page, (newPage) => {
  currentPage.value = Number(newPage) || 1;
});

// Рассчитываем общее кол-во страниц
const totalPages = computed(() => Math.ceil(listData.value.length / listConfig.value.itemsPerPage));

// Фильтруем данные для текущей страницы
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * listConfig.value.itemsPerPage;
  return listData.value.slice(start, start + listConfig.value.itemsPerPage);
});
</script>

<style>
.container {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}
</style>

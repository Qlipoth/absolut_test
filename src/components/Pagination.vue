<template>
  <div class="pagination">
    <button @click="changePage(1)" :disabled="currentPage === 1">«</button>

    <button v-if="startPage > 1" @click="changePage(startPage - 1)">...</button>

    <button
        v-for="page in pagesToShow"
        :key="page"
        @click="changePage(page)"
        :class="{ active: page === currentPage }"
    >
      {{ page }}
    </button>

    <button v-if="endPage < totalPages" @click="changePage(endPage + 1)">...</button>

    <button @click="changePage(totalPages)" :disabled="currentPage === totalPages">»</button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  totalPages: Number,
  currentPage: Number,
  visiblePages: Number,
});

const router = useRouter();

const startPage = computed(() => Math.max(1, props.currentPage - Math.floor(props.visiblePages / 2)));
const endPage = computed(() => Math.min(props.totalPages, startPage.value + props.visiblePages - 1));
const pagesToShow = computed(() => Array.from({ length: endPage.value - startPage.value + 1 }, (_, i) => startPage.value + i));

const changePage = (page) => {
  if (page !== props.currentPage) {
    router.push({ query: { page } });
  }
};
</script>

<style scoped>
.pagination {
  display: flex;
  gap: 5px;
  justify-content: center;
  margin-top: 20px;
}

button {
  padding: 8px 12px;
  border: 1px solid #ccc;
  background: #fff;
  cursor: pointer;
}

button.active {
  background: #007bff;
  color: #fff;
  font-weight: bold;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>

<template>
  <div class="container">
    <div class="info-card" v-for="(item, index) in items" :key="index">
      <NewsCard :item="item" />
    </div>
  </div>
</template>

<script setup>
import NewsCard from './NewsCard.vue';

const news = await useFetch('/main')
const items = news.data?._value || []
</script>

<style scoped>

.info-card {
  margin: 0 auto;
  width: 50%;
}
</style>

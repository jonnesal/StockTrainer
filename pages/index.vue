<template>
  <div class="flex flex-col justify-center min-h-screen items-center text-center text-lighttext gap-3">
    <br>
    <br>
    <br>
    <h1 class="text-7xl">// StockTrainer //</h1>
    <h2 class="text-3xl">Learn to manage, buy and sell stocks without risk!</h2>
    <br>
    <br>
    <p class="text-3xl -mb-8">News related to stocks</p>
    <div class="flex justify-end w-full">
      <div class="news-list">
        <NewsCard v-for="(item, index) in items" :key="index" :item="item" />
      </div>
    </div>
  </div>
</template>



<script setup>

import NewsCard from './components/NewsCard.vue';

const news = await useFetch('http://localhost:3001/stocks/main')
const items = news.data?._value || []
useHead ({
    title: "Home | StockTrainer",
    meta: [
        { name: 'description', content: "Learn to manage, buy and sell stocks without risk!" }
    ],
})
</script>

<style scoped>

</style>

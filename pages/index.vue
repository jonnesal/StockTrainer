<template>
  <div class="flex flex-col justify-center min-h-screen items-center text-center text-lighttext gap-3">
    <h1 class="text-6xl">// This is the homepage for StockTrainer //</h1>
    <h2 class="text-3xl">Learn to manage, buy and sell stocks without risk!</h2>
    <div class="flex justify-end w-full">
      <NewsList />
    </div>
  </div>
</template>



<script setup>
import ChartLine from "./components/LineChart.vue"


let ChartLineComponent = ChartLine;

import NewsList from "./components/MainNewsList.vue"

useHead ({
    title: "Home | StockTrainer",
    meta: [
        { name: 'description', content: "Learn to manage, buy and sell stocks without risk!" }
    ],
})
</script>

<style scoped>

</style>

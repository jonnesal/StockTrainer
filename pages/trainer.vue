<template>
  <div class="flex flex-col justify-center min-h-screen items-center text-center text-lighttext gap-3">
    <component :is="ChartLineComponent" />
  </div>
</template>

<script setup>

import ChartLine from "./components/LineChart.vue"

definePageMeta({ middleware: 'auth' })

let ChartLineComponent = ChartLine;

useHead ({
    title: "Trainer | StockTrainer",
    meta: [
      { name: 'description', content: "Learn to manage, buy and sell stocks without risk!" }
    ],
})

</script>

<style scoped>

</style>

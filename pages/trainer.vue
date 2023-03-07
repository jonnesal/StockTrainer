<template>
  <div class="flex flex-col justify-center min-h-screen items-center text-center text-lighttext">
    <component :is="ChartLineComponent" class="max-w-[80%] bg-secondarybackground pb-56 p-12 rounded-3xl"/>
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

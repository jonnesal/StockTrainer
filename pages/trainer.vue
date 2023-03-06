<template>
  <div class="flex flex-col justify-center min-h-screen items-center text-center text-lighttext gap-3">

    <component :is="ChartLineComponent" />

  </div>
</template>

<script setup>
//Saako dataa {{ users }}

import ChartLine from "./components/LineChart.vue"

let ChartLineComponent = ChartLine;

useHead ({
    title: "Trainer | StockTrainer",
    meta: [
      { name: 'description', content: "Learn to manage, buy and sell stocks without risk!" }
    ],
})

//console.log(users._value);
</script>

<style lang="scss" scoped>

</style>

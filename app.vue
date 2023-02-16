

<template>
  <div>
    <h1>Fetched from: {{ mountain }}</h1>
  </div>
</template>

<script setup>
const { data: mountain } = await useFetch('/http://localhost:4001')
console.log(mountain);
</script>

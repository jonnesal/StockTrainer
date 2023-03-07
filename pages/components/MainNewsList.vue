<template>
  <div class="container">
    <ul>
      <li v-for="(item, index) in items" :key="index" class="list-item">
        <a :href="item.url">{{ item.title }}</a>
        <p>{{ item.summary }}</p>
        <p>Overall sentiment: {{ item.overall_sentiment_label }}</p>
      </li>
    </ul>
    <div>
      {{indexValues}}
    </div>
  </div>
</template>

<script setup>

const news = useFetch('http://localhost:3001/testi/main')
const items = news.data?._value || []
const topIndex = useFetch('http://localhost:3001/testi/topindex')
const indexValues = topIndex.data._value;
console.log(indexValues)
//const indexItems = topIndex.data._value;


</script>

<style>
.container {
  float: right;
  text-align: right;
}
.list-item {
  border: 1px solid #fff;
  padding: 10px;
  margin-bottom: 10px;
  max-width: 800px;
}

</style>

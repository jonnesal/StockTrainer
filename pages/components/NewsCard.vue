<template>
  <div class="info-card">
    <img v-if="item.image" :src="item.image" alt="News image">
    <div class="info-card-content">
      <a :href="item.url" class="info-card-title">{{ item.title }}</a>
      <p class="info-card-summary">{{ item.summary }}</p>
      <p class="info-card-sentiment">Overall sentiment: {{ item.overall_sentiment_label }}</p>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.info-card {
  text-align: center;
  display: flex;
  padding: 15px;
  box-shadow: 3px 3px 6px;
  border-radius: 7px;
  max-width: 50%;
  margin: 30px auto 0;
}

.info-card img {
  max-width: 100px;
  margin-right: 10px;
}

.info-card-content {
  flex: 1;
}

.info-card-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
  text-decoration: none;
}

.info-card-summary {
  font-size: 14px;
  line-height: 1.5;
  color: #666;
  margin-bottom: 5px;
}

.info-card-sentiment {
  font-size: 12px;
  color: #999;
}
</style>

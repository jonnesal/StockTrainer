<template>
  <div class="info-card border-2 rounded-xl text-lighttext p-4">
    <img v-if="item.image" class="" :src="item.image" alt="News image">
    <div class="info-card-content">
      <a :href="item.url" class="info-card-title">{{ item.title }}</a>
      <p class="info-card-summary p-2">{{ item.summary }}</p>
      <p class="info-card-sentiment p-2">Overall sentiment: {{ item.overall_sentiment_label }}</p>
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
  align-items: center;
  max-width: 50%;
  margin: 30px auto 0;
}

.info-card img {
  max-width: 120px;
  max-height: 120px;
  margin-right: 10px;
  aspect-ratio: 1/1;
  
}

.info-card-content {
  flex: 1;
}

.info-card-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  text-decoration: none;
}

.info-card-summary {
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 5px;
}

.info-card-sentiment {
  font-size: 12px;
}
</style>

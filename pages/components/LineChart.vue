<template>
  <div class="chart-wrapper">
    <div class="chart-container">
      <LineChart :chart-data="data" :options="options" />
    </div>
    <div class="controls">
      <button @click="updateData" class="btn">Update Data</button>
      <ul class="lines">
        <li v-for="(value, index) in dataValues" :key="index">{{ value }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { LineChart } from 'vue-chart-3';
import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';

Chart.register(
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const dataValues = ref([12, 14, 16, 18, 11, 13, 15]);
const data = computed(() => ({
  labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  datasets: [
    {
      label: 'Foo',
      data: dataValues.value,
      borderColor: '#fff',
      backgroundColor: '#dc322f',
    },
  ],
}));
const options = ref({
  plugins: {
    title: {
      text: 'Line',
      color: '#fff',
    },
  },
});

const addLine = (value) => {
  const list = document.querySelector('.lines');
  const line = document.createElement('li');
  line.textContent = value;
  list.appendChild(line);
};

const updateData = () => {
  dataValues.value = dataValues.value.map((value) => value + Math.floor(Math.random() * 10));
  addLine(dataValues.value[dataValues.value.length - 1]);
};

</script>

<style scoped>
.chart-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #333;
}

.chart-container {
  flex: 1;
  max-width: 700px;
}

.controls {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.btn {
  margin-bottom: 10px;
  background-color: #fff;
  color: #333;
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  cursor: pointer;
}

.lines {
  list-style: none;
  margin: 0;
  padding: 0;
}

.lines li {
  color: #fff;
  margin-bottom: 5px;
}
</style>

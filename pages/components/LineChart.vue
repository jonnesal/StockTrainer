<template>
  <div>
    <LineChart
      :chart-data="data"
      :options="options"
      css-classes="chart-container"
    />
    <button @click="updateChartData" class="my-button">Update Chart Data</button>
    <p> Data API Kautta </p>{{ users }}
  </div>
</template>

<script setup>
import { LineChart } from "vue-chart-3"
import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from "chart.js"
Chart.register(
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
)
const dataValues = ref([12, 14, 13, 10, 11, 13, 15])
const data = computed(() => ({
  labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  datasets: [
    {
      label: "Foo",
      data: dataValues.value,
      backgroundColor: "#dc322f",
      borderColor: "#ffffff"
    }
  ]
}))
const options = ref({
  plugins: {
    title: {
      text: "Line"
    }
  }
})

function updateChartData() {
  dataValues.value = [
    getRandomInt(10, 20),
    getRandomInt(10, 20),
    getRandomInt(10, 20),
    getRandomInt(10, 20),
    getRandomInt(10, 20),
    getRandomInt(10, 20),
    getRandomInt(10, 20)
  ]
}

const { data: users } = await useAsyncData('count', () => $fetch('http://localhost:3001/testi/users'))

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

</script>

<style scoped>
.my-button {
  border-radius: 8px;
  background-color: black;
  color: white;
  padding: 12px 24px;
  cursor: pointer;
}

.my-button:hover {
  background-color: white;
  color: #0074D9;
}

.my-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px white;
}
</style>

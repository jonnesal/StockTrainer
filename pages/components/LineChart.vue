<template>
  <div style="display: flex;">
    <div class="chart-container" style="position: relative; height:41vh; width:80vw">
      <h2 style="margin-bottom: 10px;font-size: 16px">FTSE 100</h2>
      <LineChart :chart-data="data" :options="options" />
      <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <div style="display: flex; flex-direction: column; align-items: center;">
          <label for="itemName" style="margin-bottom: 5px;">Buy And Sell:</label>
          <input type="text" id="itemName" v-model="newItem" style="margin-bottom: 10px;">
        </div>
        <div style="display: flex; justify-content: space-between; width: 200px;">
          <button style="background-color: #dc322f; color: white; border: none; padding: 10px; font-size: 16px; width: 100px;height: 50px" @click="sell()">Sell</button>
          <button style="background-color: darkgreen; color: white; border: none; padding: 10px; font-size: 16px; width: 100px;height: 50px " @click="buy()">Buy</button>
        </div>
      </div>
    </div>
    <ul style="padding: 10px; width: 30%;">
      <li v-for="(item, index) in listItems" :key="index" style="border: 1px solid black; font-size: 24px;">{{ item }}</li>
    </ul>
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

let users1 = await useFetch('http://localhost:3001/testi/api');
const users = users1.data._value;
const currentTime = new Date();
const timeList = [];

for (let i = 30; i >= 1; i--) {
  const time = new Date(currentTime.getTime() - i * 60 * 1000);
  const formattedTime = time.toLocaleString('default', { hour: 'numeric', minute: 'numeric' });
  timeList.push(formattedTime);
}

const dataValues = ref(users);

const lastValue = computed(() => {
  if (dataValues.value.length > 0) {
    return dataValues.value[dataValues.value.length - 1];
  } else {
    return null;
  }
});

const data = computed(() => ({
  labels: timeList,
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
    tooltip: {
      enabled: true,
      intersect: false,
      mode: 'index',
      callbacks: {
        label: function(tooltipItem) {
          const yLabel = tooltipItem.yLabel.toString();
          return yLabel;
        }
      }
    }
  },
});

const listItems = ref(["Bought and sold stocks"]);

function buy() {

  const newItem = `Bought at ${lastValue.value.toFixed(2)}`;

  listItems.value.push(newItem);
  if(listItems.value.length >= 10) {
    listItems.value.pop();
  }
}

function sell() {

  const newItem = `Sold at at -${lastValue.value.toFixed(2)}`;

  listItems.value.push(newItem);
  if(listItems.value.length >= 10) {
    listItems.value.pop();
  }

}
</script>

<style scoped>
.lines li {
  color: #fff;
  margin-bottom: 5px;
}
</style>

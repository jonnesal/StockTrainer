<template>
  <div style="display: flex;" class="text-lighttext text-3xl">
    <div class="chart-container bg-primarybackground rounded-xl" style="position: relative; height:41vh; width:80vw">
      <h2 class="text-3xl border-2 border-b-0 rounded-xl rounded-b-none">FTSE 100</h2>
      <LineChart :chart-data="data" :options="options" class="bg-primarybackground border-2 border-t-0 rounded-xl rounded-t-none"/>
      <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <div style="display: flex; flex-direction: column; align-items: center;" class="pt-5">
          <label for="itemName" style="margin-bottom: 5px;">Amount</label>
          <input type="text" id="itemName" v-model="newItem" style="margin-bottom: 10px;" class="border-lighttext border-2 text-center rounded-xl bg-primarybackground hover:bg-buttonbackground transition-colors duration-150">
        </div>
        <div style="display: flex; justify-content: space-between; width: 200px;" class="gap-2">
          <button class="bg-green-700 rounded-xl border-2" style="color: white; width: 100px;height: 50px " @click="buy()">Buy</button>
          <button class="bg-red-700 rounded-xl border-2" style="color: white; width: 100px;height: 50px" @click="sell()">Sell</button>
        </div>
      </div>
    </div>
    <ul style="width: 40%;" class="pl-10">
      <li v-for="(item, index) in listItems" :key="index" style="font-size: 24px;" class="border-2 bg-primarybackground rounded-xl">{{ item }}</li>
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
const users = users1.data.value;
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
const newItem = ref()

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

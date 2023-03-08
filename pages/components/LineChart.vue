<template>
  <div style="display: flex;" class="text-lighttext text-3xl">
    <div class="chart-container bg-primarybackground rounded-xl" style="position: relative; height:41vh; width:80vw">
      <h2 class="text-3xl border-2 border-b-0 rounded-xl rounded-b-none">FTSE 100</h2>
      <LineChart :chart-data="data" :options="options" class="bg-primarybackground border-2 border-t-0 rounded-xl rounded-t-none"/>
      <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <div style="display: flex; flex-direction: column; align-items: center;" class="pt-5">
          <label for="itemName" style="margin-bottom: 5px;">Amount</label>
          <input type="number" min="0" id="itemName" v-model="stockAmount" style="margin-bottom: 10px" class="border-lighttext border-2 text-center rounded-xl bg-primarybackground hover:bg-buttonbackground transition-colors duration-150">
        </div>
        <div style="display: flex; justify-content: space-between; width: 200px;" class="gap-2">
          <button class="bg-green-700 rounded-xl border-2" style="color: white; width: 100px;height: 50px " @click="buy()">Buy</button>
          <button class="bg-red-700 rounded-xl border-2" style="color: white; width: 100px;height: 50px" @click="sell()">Sell</button>
          <button class="bg-red-700 rounded-xl border-2" style="color: white; width: 100px;height: 50px" @click="resetMoney()">refresh</button>
        </div>

          <label for="username">Username</label>

          <button type="submit" value="registerNewUser">
            <span class="border-lighttext border-2 p-2 rounded-xl bg-primarybackground hover:bg-buttonbackground transition-colors duration-150">Register</span>
          </button>

      </div>
    </div>

    <div style="display: flex; flex-direction: column; width: 30%; margin-top: 10px;">
      <h3 style="margin-bottom: 10px; font-size: 24px;border: 1px solid black;">Bank value: {{ moneyAmount }}€</h3>
      <ul style="width: 40%;" class="pl-10">
        <li v-for="(item, index) in listItems" :key="index" style="font-size: 24px;" class="border-2 bg-primarybackground rounded-xl">{{ item }}</li>
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
import router from "#app/plugins/router.mjs";

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

//TÄÄ muutetaan dabase rahamäärällä
let moneyAmount = ref(1000);

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
//Saa stockAmount input fieldist
const stockAmount = ref("")


const buyNewStock = async (stockAmount, price) => {

  try {
    const body = {
      stock_owned: "FTSE 100",
      shares_owned: stockAmount,
      buy_price: price
    }
    console.log(body);
    await fetch(`/portfolio`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then(()=>{
        router.push({ path: '/' })
      })
      .catch((error)=>{
        console.error(error);
      })
  } catch (error) {
    console.error(error)
  }

}
  function buy() {

  if(stockAmount.value !== undefined && stockAmount.value !== 0 && stockAmount.value !== "") {

    const newItem = `Bought ${stockAmount.value} stocks for ${ stockAmount.value * lastValue.value.toFixed(2) + "€"}`;
    listItems.value.push(newItem, lastValue.value);
    buyNewStock(stockAmount.value, lastValue.value.toFixed(2));
    if(listItems.value.length >= 9) {
      listItems.value.shift();
    }
  }


}

function sell() {
  if(stockAmount.value !== undefined && stockAmount.value !== 0 && stockAmount.value !== "") {
    const newItem = `Sold ${stockAmount.value} stocks for ${stockAmount.value * lastValue.value.toFixed(2) + "€"}`;

    listItems.value.push(newItem);
    if (listItems.value.length >= 9) {
      listItems.value.shift();
    }
  }

}

</script>

<style scoped>
.lines li {
  color: #fff;
  margin-bottom: 5px;
}
</style>

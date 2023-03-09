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
        <div style="display: flex; justify-content: space-between; width: auto;" class="gap-2">
          <button class="bg-green-700 rounded-xl border-2 pl-2 pr-2" style="color: white; width: auto; height: 50px " @click="buy()">Buy</button>
          <button class="bg-red-700 rounded-xl border-2 pl-2 pr-2" style="color: white; width: auto; height: 50px" @click="sell()">Sell</button>
        </div>
      </div>
    </div>
    <div style="display: flex; flex-direction: column; margin-top: 10px;">
      <p class="border-2 ml-10 bg-primarybackground rounded-xl mb-3 w-auto">Bank value<br>{{ moneyAmount }}€</p>
      <button class="bg-blue-700 rounded-xl border-2 pl-2 pr-2 ml-10 mb-3" style="color: white; width: auto; height: 50px" @click="resetMoney()">Reset money</button>
      <ul style="height: 21rem" class="pl-10 overflow-y-auto">
        <li v-for="(item, index) in listItems" :key="index" class="border-2 bg-primarybackground rounded-xl mt-3 mb-3 w-80">{{ item }}</li>
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



const listItems = ref(["Stocks exchanged"]);
//Saa stockAmount input fieldist
const stockAmount = ref("")
let moneyAmount = ref(100000);

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

function storeToken() {
  if (process.client) {
    const savedListItems = localStorage.getItem('listItems');
    if (savedListItems) {
      const listItems1 = JSON.parse(savedListItems);
      listItems.value = listItems1;
    }
    const savedMoney = localStorage.getItem('moneyAmount');
    if(savedMoney) {
      moneyAmount.value = savedMoney;
    }

  }
}


onMounted(() => {
  storeToken();
});



function resetMoney() {
  moneyAmount.value = 100000;
  localStorage.clear();

}
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
      .catch((error)=>{
        console.error(error);
      })
  } catch (error) {
    console.error(error)
  }
}

//TÄÄ muutetaan dabase rahamäärällä


function buy() {
  if(stockAmount.value !== undefined && stockAmount.value !== 0 && stockAmount.value !== "" && moneyAmount.value >= (stockAmount.value * lastValue.value.toFixed(2))) {
    const newItem = `BOUGHT ${stockAmount.value} FOR ${ stockAmount.value * lastValue.value.toFixed(2) + "€"}`;
    moneyAmount.value = moneyAmount.value - (stockAmount.value * lastValue.value.toFixed(2));
    listItems.value.push(newItem);

    if (process.client) {
      localStorage.setItem('listItems', JSON.stringify(listItems.value));
      localStorage.setItem('moneyAmount', moneyAmount.value);
    }

    buyNewStock(stockAmount.value, lastValue.value.toFixed(2));
    if(listItems.value.length >= 9) {
      listItems.value.shift();
    }
  }
}

function sell() {
  if(stockAmount.value !== undefined && stockAmount.value !== 0 && stockAmount.value !== "") {
    const newItem = `SOLD ${stockAmount.value} FOR ${stockAmount.value * lastValue.value.toFixed(2) + "€"}`;
    moneyAmount.value = moneyAmount.value + (stockAmount.value * lastValue.value.toFixed(2));
    listItems.value.push(newItem);

    if (process.client) {
      localStorage.setItem('listItems', JSON.stringify(listItems.value));
      localStorage.setItem('moneyAmount', moneyAmount.value);
    }

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

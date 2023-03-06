<template>
  <div class="chart-wrapper">
    <div class="chart-container" style="position: relative; height:41vh; width:80vw">
      <LineChart :chart-data="data" :options="options" />
    </div>
    <div class="controls">
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

//Joskus lista on olemassa ja jokus ei???? joten if()checkkaa olemassa olon
const addLine = (value) => {
  const list = document.querySelector('.lines');
  if (list) {
    const line = document.createElement('li');
    line.textContent = value;
    list.appendChild(line);
  }
};

// Fetch data every 10 seconds
/*setInterval(() => {
  useFetch('http://localhost:3001/testi/api')
    .then(res => {
      dataValues.value = res.data._value;
      addLine(dataValues.value[dataValues.value.length - 1]);
    })
    .catch(error => console.log(error));
}, 3000000);

 */
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

.lines li {
  color: #fff;
  margin-bottom: 5px;
}
</style>

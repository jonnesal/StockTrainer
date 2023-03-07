const express = require('express')
const cors = require('cors');
// Create an Express app
const app = express()
const axios = require('axios');
app.use(cors());
// Define a simple API route
app.get('/testi/example', (req, res) => {
  const testi = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ]
  res.json(testi)
})

app.post('/testi/users', (req, res) => {
  let body = req.body
  console.log(body)
})

app.get('/testi/users', (req, res) => {
  let body = req.body
  console.log(body)
})

app.get('/testi/main', async  (req, res) => {


  const API_KEY = 'IVMY38CL0NQHZ412';
  let API_URL;


   API_URL = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=EUR&apikey=${API_KEY}`;

  axios.get(API_URL)
    .then(response => {
      const data = response.data['Realtime Currency Exchange Rate'];
      const fromCurrency = data['1. From_Currency Code'];
      const toCurrency = data['3. To_Currency Code'];
      const exchangeRate = data['5. Exchange Rate'];
      console.log(`1 ${fromCurrency} = ${exchangeRate} ${toCurrency}`);
    })
    .catch(error => {
      console.error(error);
    });

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() ).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');

  const dateString = `${year}${month}${day}T${hours}${minutes}`;
  console.log(dateString);



  API_URL = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=CRYPTO:BTC,FOREX:USD&time_from=${dateString}&limit=1&apikey=${API_KEY}`;

  axios.get(API_URL)
    .then(response => {
      const data = response.data;
      const firstTenItems = data.feed.slice(0, 5);

      const simplifiedList = firstTenItems.map(item => {
        return {
          title: item.title,
          url: item.url,
          summary: item.summary,
          overall_sentiment_label: item.overall_sentiment_label
        };
      });

      console.log(simplifiedList);
      res.json(simplifiedList);
    })
    .catch(error => {
      console.error(error);
    });




})

app.get('/testi/topindex', async (req, res) => {


  let indexData = [];


  //SP500
  axios.get('https://query1.finance.yahoo.com/v8/finance/chart/%5EGSPC', {
    params: {
      range: '1d',
      includePrePost: true,
      interval: '1m',
      region: 'US',
      lang: 'en-US',
      includeYahooAuth: true,
      corsDomain: 'finance.yahoo.com',
    },
  })
    .then((response) => {
      const { result } = response.data.chart;
      const { open } = result[0].indicators.quote[0];
      const spData = {
        name: 'S&P 500',
        openingPrice: open[0],
        currentPrice: open.slice(-1)[0],
      };
      indexData.push(spData);
      console.log(` S&P 500 Opening price: ${open[0]}, Current price: ${open.slice(-1)[0]}`);
    })
    .catch((error) => {
      console.error(error);
    });


//ASIA
  axios.get('https://query1.finance.yahoo.com/v8/finance/chart/%5EN225', {
    params: {
      range: '1d',
      includePrePost: true,
      interval: '1m',
      region: 'JP',
      lang: 'en-US',
      includeYahooAuth: true,
      corsDomain: 'finance.yahoo.com',
    },
  })
    .then((response) => {
      const { result } = response.data.chart;
      const { open } = result[0].indicators.quote[0];


      const nikkeiData = {
        name: 'Nikkei 225',
        openingPrice: open[0],
        currentPrice: open.slice(-1)[0],

      };
      indexData.push(nikkeiData)

      console.log(`Nikkei 225 Opening price: ${open[0]}, Current price: ${open.slice(-1)[0]}`);

    })
    .catch((error) => {
      console.error(error);
    });


//EUROPE
  axios.get('https://query1.finance.yahoo.com/v8/finance/chart/%5EFTSE', {
    params: {
      range: '1d',
      includePrePost: true,
      interval: '1m',
      region: 'UK',
      lang: 'en-GB',
      includeYahooAuth: true,
      corsDomain: 'finance.yahoo.com',
    },
  })
    .then((response) => {
      const { result } = response.data.chart;
      const { open } = result[0].indicators.quote[0];

      const FTSE = {
        name: 'FTSE 100',
        openingPrice: open[0],
        currentPrice: open.slice(-1)[0],
      };
      indexData.push(FTSE);

      console.log(indexData)


      console.log(`FTSE 100 Opening price: ${open[0]}, Current price: ${open.slice(-1)[0]}`);
    })
    .catch((error) => {
      console.error(error);
    });

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
//Tulokset tulee eriaikaan joten sleeppaan 0.2s
  async function demo() {
    for (let i = 0; i < 5; i++) {
      await sleep(i * 20);
    }
    res.json(indexData)
  }

  await demo();





})


app.get('/testi/api',async (req, res) => {

  //Otetaan viimesen tunnin kurssi
  //FTSE On lontoon pörssin suurin osakeindexsi ilmasella ei saa hyvin yksittäisiä osakkeita kuten AAPL
  //Pyydän viimesen 45min dataa mutta 15min viiveen takia saan vaan 30min
  const symbol = '^FTSE';
  const exchange = 'LON';
  const now = Math.floor(Date.now() / 1000);
  const halfAnHour = now - 2700;

  const apiUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1m&period1=${halfAnHour}&period2=${now}&includePrePost=true&corsDomain=finance.yahoo.com&.tsrc=finance&market=${exchange}`;


  axios.get(apiUrl)
    .then(response => {
      const data = response.data;
      const price = data.chart.result[0].indicators.quote[0].close;
      //Jos haet tätä stockmarkertin sulkeutumisen jälkeen niin saat nämä basic arvot
      if(price === undefined) {
        let emt;
        emt = [7899.31982421875, 7899.97998046875,
          7900.43017578125, 7902.0498046875,
          7902.93994140625, 7903.18017578125,
          7903.83984375,    7903.85986328125,
          7904.3701171875,  7903.919921875,
          7904.22021484375, 7904.58984375,
          7903.9599609375,  7904.490234375,
          null,             7904.2998046875]


        res.json(emt);
        console.log(emt);
      }else{
        res.json(price);
      }

    })
    .catch(error => {
      console.log(error);
    });

//API KEY  IVMY38CL0NQHZ412
})
// Start the server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`)
})

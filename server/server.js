const express = require('express')
const cors = require('cors');
const app = express()
const axios = require('axios');
const { PrismaClient } = require('@prisma/client')
const bodyParser = require("body-parser");
const prisma = new PrismaClient()
app.use(cors());


app.post('/stocks/userPortfolio', bodyParser.json(), async (req, res) => {
  const { stock_owned, shares_owned, buy_price } = req.body

  try {
    const portfolio = await prisma.portfolio.create({
      data: {
        stock_owned,
        shares_owned,
        buy_price
      }
    })
    res.json(portfolio)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to create portfolio record' })
  }
})

//Koska user tehdään jossain muualla nuxt auth kanssa niin ei oo mitään ideaa miten tämä pitäs liittää siihe käyttäjän omistamaan id:hen.
app.get('/stocks/portfolio', async (req, res) => {
  try {
    const portfolio = await prisma.portfolio.findMany( {
      where: {stock_owned: ('FTSE 100')}
    })
    //where id:
    res.json(portfolio)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error 500' })
  }
})
app.get('/stocks/main', async  (req, res) => {


  const API_KEY = 'IVMY38CL0NQHZ412';
  let API_URL;

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
      const firstTenItems = data.feed.slice(0, 10);
      console.log(firstTenItems);
      const simplifiedList = firstTenItems.map(item => {
        return {
          title: item.title,
          url: item.url,
          summary: item.summary,
          image: item.banner_image,
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

app.get('/stocks/topindex', async (req, res) => {

/*
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
      await sleep(i * 10);
    }
    res.json(indexData)
  }
  await demo();
 */


  //Tää sais usa, asia, aj euroopan stock markettejen yleis suunnan. mutta ei ollu aikaa laittaa toimiin frond-endis
})


app.get('/stocks/trainer',async (req, res) => {

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
        let mockdata;
        mockdata = [7899.31982421875, 7899.97998046875,
          7900.43017578125, 7902.0498046875,
          7902.93994140625, 7903.18017578125,
          7903.83984375,    7903.85986328125,
          7904.3701171875,  7903.919921875,
          7904.22021484375, 7904.58984375,
          7903.9599609375,  7904.490234375,
          null,             7904.2998046875]


        res.json(mockdata);
        console.log(mockdata);
      }else{
        res.json(price);
      }

    })
    .catch(error => {
      console.log(error);
    });

//API KEY  IVMY38CL0NQHZ412
})

//Tarvis taas sen id:
app.delete('/stocks/sell/stock',async (req, res) => {

  try {
    const portfolio = await prisma.portfolio.delete( {
      where: {id: 1 }
    })
    //Ei ole yhdistetty muuhun työhön
    res.json(portfolio)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error 500' })
  }

})
// Start the server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`)
})

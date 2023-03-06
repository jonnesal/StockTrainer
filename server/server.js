const express = require('express')
const cors = require('cors');
// Create an Express app
const app = express()

app.use(cors());
// Define a simple API route
app.get('/testi/users', (req, res) => {
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ]
  res.json(users)
})

app.get('/testi/api',async (req, res) => {

  //Otetaan viimesen tunnin kurssi
  const axios = require('axios');
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


})
// Start the server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`)
})

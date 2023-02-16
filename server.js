const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/api/test', (req, res) => {
  res.send('Hello from Express.js!');
});

module.exports = {
  path: '/api',
  handler: app
};

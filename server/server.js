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

// Start the server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`)
})

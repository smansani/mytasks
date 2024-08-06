const connectToMongo = require('./mongo');
const express = require('express')
const cors = require('cors');
const app = express()

connectToMongo()
app.use(cors());
app.use(express.json());

const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app http://localhost:${port}`)
})
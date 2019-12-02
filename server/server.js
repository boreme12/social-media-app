const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      mongoose = require('mongoose'),
      routes = require('./routes/routes'),
      { handleErrorResponse } = require('./helpers/handleResponse')
      require('dotenv').config()

const port = 443
const { DB_URI } = process.env

mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to mongodb')
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(express.static('public'))
app.use(routes)
app.use((err, req, res, next) => {
  console.log('error: '+err)
  handleErrorResponse(res, err, 500, 'fail')
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Example apps listening on port ${port}!`))
}

module.exports = app
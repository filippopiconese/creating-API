const express = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const db = require('./config/db')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

require('./app/routes')(app, {})

const port = 8000

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.error(err)

  const db = database.db('filippo3000database')
  require('./app/routes')(app, db)

  app.listen(port, () => {
    console.log('We are live on ' + port)
  })
})

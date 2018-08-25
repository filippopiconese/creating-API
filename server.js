const express = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
let db = require('./config/db')

const app = express()

const port = 8000

app.use(bodyParser.urlencoded({ extended: true }))

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.error(err)

  db = database.db('filippo3000database')
  require('./app/routes')(app, db)

  app.listen(port, () => {
    console.log('We are live on ' + port)
  })
})

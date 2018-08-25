var ObjectID = require('mongodb').ObjectID

module.exports = function (app, db) {
  app.get('/notes/:id', (req, res) => {
    const id = req.params.id // it's used to GET the ID from the URL

    const details = { '_id': new ObjectID(id) }

    db.collection('notes').findOne(details, (err, item) => {
      err
        ? res.send({ 'error': 'An error has occurred on GET' })
        : res.send(item)
    })
  })

  app.delete('/notes/:id', (req, res) => {
    const id = req.params.id

    const details = { '_id': new ObjectID(id) }

    db.collection('notes').remove(details, (err, item) => {
      err
        ? res.send({ 'error': 'An error has occurred on DELETE' })
        : res.send('Note ' + id + ' deleted!')
    })
  })

  app.post('/notes', (req, res) => {
    const note = { text: req.body.Body, title: req.body.Title }

    db.collection('notes').insert(note, (err, result) => {
      err
        ? res.send({ 'error': 'An error has occurred on POST' })
        : res.send(result.ops[0])
    })
  })
}

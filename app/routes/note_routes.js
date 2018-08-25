module.exports = function (app, db) {
  app.post('/notes', (req, res) => {
    const note = { text: req.body.Body, title: req.body.Title }

    db.collection('notes').insert(note, (err, result) => {
      err
        ? res.send({ 'error': 'An error has occurred' })
        : res.send(result.ops[0])
    })
  })
}

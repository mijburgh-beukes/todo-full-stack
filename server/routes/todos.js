const express = require('express')
const router = express.Router

const db = require('../db/db')

router.post('/', (req, res) => {
  db.addTask(req.body)
    .then(todo => {
      res.json(todo)
      return null
    })
    .catch(err => logErr(err))
})

function logErr (res, err) {
  return res.status(500).send('DB erro: ' + err.message)
}

module.exports = router

const express = require('express')
const router = express.Router()

const db = require('../db/db')

router.post('/', (req, res) => {
  db.addTask(req.body)
    .then(task => {
      res.json(task)
      return null
    })
    .catch(err => logErr(err))
})

router.get('/', (req, res) => {
  db.getTasks()
    .then((tasks) => {
      console.log(tasks)
      return res.json(tasks)
    })
    .catch(err => logErr(err))
})

function logErr (res, err) {
  return res.status(500).send('DB erro: ' + err.message)
}

module.exports = router

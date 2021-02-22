const express = require('express')
const path = require('path')

const todoRoutes = require('./routes/todoRoutes')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/todos', todoRoutes)

module.exports = server

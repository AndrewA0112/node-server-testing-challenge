const express = require('express')

const Shouts = require('../shouts/shouts-model.js')

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up' })
})

server.get('/hobbits', (req, res) => {
    Shouts.getAll()
        .then(shouts => {
            res.status(200).json(shouts)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

module.exports = server;
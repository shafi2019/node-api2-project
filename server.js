const express = require('express');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

server.use(express.json());

server.use('/api/posts', hubsRouter);


server.get('/', (req, res) => {
    res.send(`
    <h2> Shafi Designed API </h2>
    <p>Welcome to the Shafi Posts API</p>
    `);
});

module.exports = server;
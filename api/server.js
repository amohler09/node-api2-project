//  STEP ONE

//  import express
const express = require('express');

//  import individual routers & set to variable
const postsRouter = require('../posts/posts-router.js');

//  define server and use express middleware
const server = express();

//  fire up server and invoke middleware
server.use(express.json());

//  verify server is running?
server.get('/', (req, res) => {
    const query = req.query;
    res.status(200).json(query);
});

//  set up server to use correct router for endpoints
server.use('/api/posts', postsRouter);

//  export server
module.exports = server;





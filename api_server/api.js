'use strict';

const http = require('http');
const express = require('express');
const app = express();

let server = http.createServer(app);
let io = require('socket.io').listen(server);

server.listen(80);

app.post('/', scanHandler);

function scanHandler(req, res){
  console.log('post was hit');
  res.status(200).send('post was hit')
}



io.on('connection', (socket) => {
  console.log('connected');

})

/// not sure what to do here
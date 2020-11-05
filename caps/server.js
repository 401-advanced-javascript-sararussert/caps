'use strict';

const io = require('socket.io');


const port = process.env.PORT || 3000;
const server = io(port);

const vendorServer = server.of('/vendor');
const driverServer = server.of('/driver');


server.on('connection', (socket) => {
  console.log('connection made');

  socket.on('message', function(data) {
    console.log(new Date(), data);
    socket.broadcast.emit('message', data);
  })

  // Here's what we do when events come in
  socket.on('data', dispatchEvent);

  socket.on('error', (e) => { console.log('SOCKET ERROR', e); });
  socket.on('end', (e) => { delete socketPool[id]; });

});

server.on('error', (e) => {
  console.error('SERVER ERROR', e.message);
});

function dispatchEvent(buffer) {
  let message = JSON.parse(buffer.toString().trim());
  // Right now, this is "dumb", just sending out the same messages to everyone
  // How might we handle more complex events and maybe chat commands?
  console.log(new Date(), message);
  socket.broadcast.emit(message);
}

function broadcast(message) {

  let payload = JSON.stringify(message);
  for (let socket in socketPool) {
    socketPool[socket].write(payload)
  }
}
'use strict';

const io = require('socket.io');


const port = process.env.PORT || 3000;
const server = io(port);

const vendorServer = server.of('/vendor');
const driverServer = server.of('/driver');

const messageQueue = {
  pickup: {},
  inTransit: {},
  delivered: {},
  thankYou: {}
}


server.on('connection', (socket) => {
  console.log('connection made');

  socket.on('message', function(data) {
    if (data.event === 'pickup') {
      let id = Math.floor(Math.random() * 10000000);
      data.qID = id
    }
    updateQueue(data);
    console.log(new Date(), data);
    socket.broadcast.emit('message', data);
  })

  socket.on('getPickups', () => {
    Object.keys(messageQueue.pickup).forEach(id => {
      socket.emit('message', messageQueue.pickup[id])
    });
  });



  socket.on('error', (e) => { console.log('SOCKET ERROR', e); });
  socket.on('end', (e) => { delete socketPool[id]; });

});

server.on('error', (e) => {
  console.error('SERVER ERROR', e.message);
});

function updateQueue(data) {
  if (data.event === 'pickup') {
    messageQueue.pickup[data.qID] = data;
  } else if (data.event === 'in-transit') {
    delete messageQueue.pickup[data.qID]
    messageQueue.inTransit[data.qID] = data;
  } else if (data.event === 'delivered') {
    delete messageQueue.inTransit[data.qID]
    messageQueue.delivered[data.qID] = data;
  } else if (data.event === 'Thank you for delivering') {
    delete messageQueue.delivered[data.qID]
    messageQueue.thankYou[data.qID] = data;
  }
}
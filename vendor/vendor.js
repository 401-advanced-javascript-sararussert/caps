'use strict';

const ioClient = require('socket.io-client');

const client = ioClient('ws://localhost:3000');

let order = {
  store: '1-206-flowers',
  orderID: '0001',
  customer: 'Sara R',
  address: '1234 street, Ellensburg, Wa'
}

client.on('connect', () => {
  console.log('vendor connected');
  sendPickupMessage('pickup', order);

  client.on('message', function (data) {
    if (data.event === 'delivered') {
      console.log(data.event, data.payload.orderID);
      handleDelivery(data);
    }   
  });
});


function sendPickupMessage(eventType, orderInfo) {
  console.log('sending', eventType);
  let data = {event: eventType, payload: orderInfo };
  
  setInterval(() => {
    client.emit('message', data);
  }, 5000);
  
}


function handleDelivery(data) {
  let event = { event: 'Thank you for delivering', payload: data.payload, qID: data.qID };
  setTimeout(() => {
    client.emit('message', event);
  }, 1000);
}


'use strict';

const ioClient = require('socket.io-client');
const client = ioClient('ws://localhost:3000');



client.on('connect', () => {
  console.log('driver connected');

  client.emit('getPickups');

  client.on('message', function (data) {
    if (data.event === 'pickup') {
      handlePickup(data);
    }  
    console.log(data.event, data.payload.orderID);
  });
});


function handlePickup(data) {
  let event = { event: 'in-transit', payload: data.payload, qID: data.qID };
  setTimeout(() => {
    client.emit('message', event)
  }, 1000);
  let data2 = { event: 'delivered', payload: data.payload, qID: data.qID };
  setTimeout(() => {
    client.emit('message', data2)
  }, 3000);

}





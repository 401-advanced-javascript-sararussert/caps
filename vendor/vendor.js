'use strict';


// TCP library (built into node)
const net = require('net');

const client = new net.Socket();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
client.connect(port, host, () => { console.log('server is up', port)});
const EE = require('events');
const eventMgr = new EE();

eventMgr.on('delivered', handleDelivery)


client.on('data', function (data) {
  let event = JSON.parse(data);
  if (event.event === 'delivered') {
    console.log(event.event, event.payload.orderID);
  }
  if (event.event === 'delivered') {
    eventMgr.emit('delivered', event.payload);
  }
});

function sendPickupMessage(eventType, orderInfo) {
  console.log('sending', eventType);
  let event = JSON.stringify({ event: eventType, payload: orderInfo });
  
  setInterval(() => {
    client.write(event);
  }, 5000);
  
}

let order = {
  store: '1-206-flowers',
  orderID: '0001',
  customer: 'Sara R',
  address: '1234 street, Ellensburg, Wa'
}

function handleDelivery(payload) {
  let event = JSON.stringify({ event: 'Thank you for delivering', payload: payload });
  setTimeout(() => {
    client.write(event)
  }, 1000);
}

//every 5 seconds send a message that has a pickup event
sendPickupMessage('pickup', order);




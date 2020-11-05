'use strict';

const ioClient = require('socket.io-client');

const client = ioClient('ws://localhost:3000');
const EE = require('events');
const eventMgr = new EE();


client.on('connect', () => {
  console.log('vendor connected');

  client.on('message', function (data) {
    console.log(data.event, data.payload.orderID);
    if (data.event === 'pickup') {
      handlePickup(data);
    }  
  });
});



function handlePickup(payload) {
  let data = { event: 'in-transit', payload: payload.payload };
  setTimeout(() => {
    client.emit('message', data)
  }, 1000);
  let data2 = { event: 'delivered', payload: payload.payload };
  setTimeout(() => {
    client.emit('message', data2)
  }, 3000);

}







// function sendMessage(eventType, orderInfo) {
//   console.log('sending', eventType);
//   let event = JSON.stringify({ event: eventType, payload: orderInfo });
  
//   setInterval(() => {
//     client.write(event);
//   }, 5000);
  
// }

// let order = {
//   store: '1-206-flowers',
//   orderID: '0001',
//   customer: 'Sara R',
//   address: '1234 street, Ellensburg, Wa'
// }

// //every 5 seconds send a message that has a pickup event
// sendPickupMessage('pickup', order);





// This application is intended to be run by delivery drivers in their vehicles. If the application is running, say on their phone, anytime a package is ready for pickup, they would get a notification. When they pickup the package, they might hit a button to let the system know that the package is in transit. And once they deliver the package to the customer, they could again hit a button that would let everyone (especially the store owner) know that the package was delivered.

// Application Workflow

// Connect to the CAPS server
// Listen for the data event coming in from the CAPS server
// When data arrives, parse it (it should be JSON) and look for the event property and begin processing…
// If the event is called pickup
// Simulate picking up the package
// Wait 1 second
// Log “picking up id” to the console
// Create a message object with the following keys:
// event - ‘in-transit’
// payload - the payload from the data object you just received
// Write that message (as a string) to the CAPS server
// Simulate delivering the package
// Wait 3 seconds
// Create a message object with the following keys:
// event - ‘delivered’
// payload - the payload from the data object you just received
// Write that message (as a string) to the CAPS server
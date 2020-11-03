'use strict';

require('dotenv').config();
const EE = require('events');

const eventMgr = new EE();

let sampleOrder = { 
  store: '1-206-flowers',
  orderID: 'e3669048-7313-427b-b6cc-74010ca1f8f0',
  customer: 'Jamal Braun',
  address: 'Schmittfort, LA' 
}

function timeStamp() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();
  let hour = String(today.getHours()).padStart(2, '0');
  var time = hour + ":" + String(today.getMinutes()).padStart(2, '0');
  today = `${yyyy}-${mm}-${dd}T${time}:00`;
  return today;
}



function process(sampleOrder, timeStamp) {
  // Listeners
  eventMgr.on('pickup', driverPickupHandler);
  eventMgr.on('in-transit', handleInTransit);
  eventMgr.on('delivered', handleDelivered)

  // begin process
  eventMgr.emit('pickup', timeStamp, sampleOrder);
  setTimeout(() => {
    driverMsg(sampleOrder.orderID);
    eventMgr.emit('in-transit', timeStamp, sampleOrder);
  }, 1000);
  setTimeout(() => {
    console.log(`DRIVER: delivered at ${timeStamp()}`);
    eventMgr.emit('delivered', timeStamp, sampleOrder);
  }, 3000);
}

  // Event handlers
  function driverPickupHandler(timeStamp, sampleOrder) {
    console.log(`VENDOR: Pick-Up ready at time:${timeStamp()}${sampleOrder}`);
  }

  function handleDelivered(timeStamp, sampleOrder) {
    console.log(`VENDOR: Thank you for ${sampleOrder.orderID}`);
  }

  function driverMsg(orderID){
    console.log(`DRIVER: picked up ${orderID}`);
  }

  function handleInTransit(timeStamp, sampleOrder){
    console.log(`DRIVER: Your package ${sampleOrder.orderID} is in transit at ${timeStamp()}`);
  }

process(sampleOrder, timeStamp);

module.exports = { 
  driverPickupHandler: driverPickupHandler,
  handleInTransit: handleInTransit,
  handleDelivered: handleDelivered
}
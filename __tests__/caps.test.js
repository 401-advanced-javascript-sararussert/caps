'use strict';

const obj = require('../caps.js');

// helper
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

let sampleOrder = { orderID : 1 };

describe('tests functionality of event handler functions', () => {
  test('driver pickup handler should console log - VENDOR: Pick-Up ready at time:', () => {
    expect(obj.driverPickupHandler(timeStamp, sampleOrder)).toStrictEqual(`VENDOR: Pick-Up ready at time:${timeStamp()}${sampleOrder}`);
  });
  test('in transit handler to console log - ', () => {
    expect(obj.handleInTransit(timeStamp, sampleOrder)).toStrictEqual(`DRIVER: Your package ${sampleOrder.orderID} is in transit at ${timeStamp()}`);
  });
  test('handleDelivered should console log - VENDOR: Thank you for ${sampleOrder.orderID}', () => {
    expect(obj.handleInTransit(timeStamp, sampleOrder)).toStrictEqual(`VENDOR: Thank you for ${sampleOrder.orderID}`);
  });
});
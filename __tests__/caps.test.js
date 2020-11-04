const emitter = require('../events');
require('../vendor/vendor.js');

jest.useFakeTimers();

beforeEach(jest.clearAllTimers);

const delivery = {
  store: '1-206-flowers',
  orderID: '1234',
  customer: 'tester testerooni',
  address: '123 Nowhere Lane'
};

describe('Testing the Vendor: ', () => {

  it('Should respond to the delivered event at right time', () => {

    console.log = jest.fn();

    const inTransitHandler = jest.fn();

    emitter.on('delivered', );

    emitter.emit('pickup', delivery);

    expect(inTransitHandler).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(1000);

    expect(inTransitHandler).toHaveBeenCalledTimes(1);

    expect(console.log).toHaveBeenCalledWith(`DRIVER: picked up ${delivery.orderID}`);

  });


  it('Should emit delivered event at right time', () => {

    console.log = jest.fn();

    const deliveredHandler = jest.fn();

    emitter.on('delivered', deliveredHandler);

    emitter.emit('pickup', delivery);

    expect(deliveredHandler).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(5000);

    expect(deliveredHandler).toHaveBeenCalledTimes(1);

    // WARNING: notice the "Last" in method name
    expect(console.log).toHaveBeenLastCalledWith(`DRIVER: delivered up ${delivery.orderID}`);

  });


});
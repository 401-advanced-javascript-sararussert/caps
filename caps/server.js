'use strict';

// The Hub Server has one job – accept all inbound events and data, validate them, and and then re-broadcast them to everyone except the sender. It doesn’t perform any logic other than to ensure that the inbound events are properly formatted before it broadcasts them.

// **Creates a pool of connected clients
// **Accept inbound TCP connections on a declared port
// **On new connections, add the client to the connection pool
// **On incoming data from a client
// **Read and parse the incoming data/payload
// Verify that the data is legitimate
// Is it a JSON object with both an event and payload properties?
// If the payload is ok, broadcast the raw data back out to each of the other connected clients



const net = require('net');

const port = process.env.PORT || 3000;
const server = net.createServer();

server.listen(port, () => console.log(`Server up on ${port}`));

// Create a list of clients that have connected to us.
let socketPool = {};

server.on('connection', (socket) => {
  // Give each client a unique ID number
  const id = `Socket-${Math.random()}`;
  // Add them to the list (we're goign to need this later...)
  socketPool[id] = socket;

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
  broadcast(message);
}

function broadcast(message) {

  let payload = JSON.stringify(message);
  for (let socket in socketPool) {
    socketPool[socket].write(payload)
  }
}
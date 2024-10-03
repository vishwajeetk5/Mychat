const express = require('express');
const bodyParser = require('body-parser');
const http = require('http'); // Required to create the server
const { Server } = require('socket.io'); // Correct import for socket.io
const { disconnect } = require('process');

const app = express();
const server = http.createServer(app); // Create the server
const io = new Server(server); // Initialize socket.io with the server

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log('💬 Chat server is live on http://localhost:' + PORT);
});

// Socket.io connection
let socketConnected = new Set();

io.on('connection', (socket) => {
  console.log('New connection: ' + socket.id);
   socketConnected.add(socket.id);
  io.emit('total-clients',socketConnected.size)

  socket.on('disconnect',()=>{
    console.log('Disconnected: ' + socket.id);
    socketConnected.delete(socket.id);
    io.emit('total-clients',socketConnected.size)
  })

  socket.on('message',(data)=>{
    console.log(data);
    socket.broadcast.emit('chat-msg',data)
  })

});


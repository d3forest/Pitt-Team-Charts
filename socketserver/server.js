var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


http.listen(4200, () => {
  console.log('listening on port 4200');
});

io.on('connection', (socket) => {
  console.log('Client connected');
  dataUpdate(socket);
});

function dataUpdate(socket) {
  
  socket.emit('dataupdate', Array.from({ length: 8 }, () => Math.floor(Math.random() * 1000)));

  setTimeout(() => {
    dataUpdate(socket);
  }, 2000)
}

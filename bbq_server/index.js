const app = require('express')();
const http = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(http, {
    cors: {
     origin: "*",
      credentials: true
    },
    transports: ['websocket']
  });
const os = require("os");

const port = process.env.PORT || 4000;
// Initialize SPI
const SPI = require('pi-spi');
const spi = SPI.initialize("/dev/spidev0.0"),
    buf = Buffer.allocUnsafe(2)
buf.writeUInt16BE(65535);
spi.dataMode(1);
spi.clockSpeed(1000000); 

io.on('connection', socket => {
    // Emit a message to all clients
    console.log(socket.handshake.address);
    
    console.log('Client Connected');

    var intervalId = setInterval(() => {
        spi.read(4, (error, data) => {
            if(error) console.error(e);
            //socket.emit('message', Math.floor(Math.random() * 500);
            socket.emit('message', data.readUInt32LE());
            //console.log("sent: ", new Date())
        });
       
    }, 500)

    socket.on('disconnect', () => {
        console.log("Client %s Disconnected!", socket.handshake.address);
        clearInterval(intervalId);
    })

})

http.listen(port, () => {
    console.log('Server running at http://%s:%s/', os.hostname(), port);
    console.log(port);
})
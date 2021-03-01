const app = require('express')();
const http = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(http, {
    cors: {
     origin: "*",
      credentials: true
    }
  });

let dbname = 'data';

var randomNumber = require("random-number-csprng");
var Promise = require("bluebird")
var d =  new Date();
var counter = 0;
var randInt = 5;

io.on('connection', socket => {
    // Emit a message to all clients
    //socket.emit('message', {name: 'testName', message:'This tutorial sucks'});
    console.log(socket.handshake.address);
    // When a message is received, emit the message to all clients
    /* socket.on('message', ({name, message}) => {
        console.log({name, message});
        io.emit('message', {name, message});
    })*/ 
    
    console.log('Client Connected');

    var intervalId = setInterval(() => {
        socket.emit('message', {name: 'RNG', message: Math.floor(Math.random() * 100)});
        counter++;
        console.log("sent: ", new Date())
    }, 1000)

    socket.on('disconnect', () => {
        console.log("Client Disconnected!");
        clearInterval(intervalId);
    })

})



function loop(socket, counter) {
    
}

http.listen(4000, () => {
    console.log('listening on port 4000!');
})
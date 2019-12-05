const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
app.use(express.static(__dirname + './socket'))

io.on('connection',function(socket) {
    socket.emit('hehe','链接成功');
    socket.broadcast.emit('list','test')
    socket.on('backend',(msg) => {
        console.log(msg)
    })

    socket.on('receive',(msg) => {
        socket.broadcast.emit('message',msg)
        console.log(msg)
    })
});
server.listen(8000,'0.0.0.0')
console.log('io')
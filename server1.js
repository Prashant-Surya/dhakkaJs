var server = require('http').createServer();
var io = require('socket.io')(server);
var crypto = require('crypto');
server.listen(8004);
console.log('Running on port 8004');

function getRoomHash(value) {
    hash = crypto.createHash('md5').update(value).digest('hex');
    return hash;
}

nsp = io.of('/notifications');
nsp.on('connection', function(socket){
    console.log('connected');
    socket.on('subscribe', function(value){
        console.log(value);
        room_hash = getRoomHash(value);
        socket.join(room_hash);
        console.log(socket.id);
        nsp.to(room_hash).emit('message', 'ping');
        console.log(nsp.adapter.rooms[room_hash]);
    });
    socket.on('sending', function(data) {
        console.log(data);
    });
    socket.on('unsubscribe', function(value){
        room_hash = getRoomHash(value);
        socket.leave(room_hash);
        //console.log(nsp.clients());
    });


    socket.on('disconnect', function(socket){
        console.log('disconnected');
        //console.log(nsp.clients());
    });
});

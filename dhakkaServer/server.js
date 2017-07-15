var server = require('http').createServer();
var io = require('socket.io')(server);
var crypto = require('crypto');
var redis = require('redis');
server.listen(8000);
console.log('Running on port: 8000');

function getRoomHash(value) {
    hash = crypto.createHash('md5').update(value).digest('hex');
    return hash;
}

var redis_client = redis.createClient(6379, '192.168.2.95');



nsp = io.of('/notifications');

redis_client.on("message", function(channel, message) {
    console.log(channel, message);
    nsp.to(channel).emit('message', message);
    console.log(nsp.adapter.rooms[channel]);
});


nsp.on('connection', function(socket){
    console.log('connected');
    socket.on('subscribe', function(channel){
        console.log(channel);
        socket.join(channel);
        redis_client.subscribe(channel);
        console.log(socket.id);
        nsp.to(channel).emit('message', 'subscribed.');
        console.log(nsp.adapter.rooms[channel]);
    });

    socket.on('sending', function(value){
        console.log(value);
    });

    socket.on('unsubscribe', function(channel){
        //room_hash = getRoomHash(value);
        socket.leave(channel);
        //console.log(nsp.clients());
    });

    socket.on('disconnect', function(socket){
        console.log('disconnected');
        //socket.leave(channel);
        //console.log(nsp.adapter.rooms[channel]);
        //console.log(nsp.clients());
    });
});

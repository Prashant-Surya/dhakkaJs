import io from 'socket.io-client';

class DhakkaClient{

    constructor(host, port, namespace) {
        this.host = host;
        this.port = port;
        this.nsp = namespace;
        if(namespace == null || namespace == undefined){
            this.nsp = "/";
        }
        this.url = "http://" + this.host + ":" + this.port + "/" + this.nsp;
        //TODO: Need to update with server connection path
        this.socket = io(this.url,{
            transports: ['websocket']
        });

        this.socket.on('reconnect_attempt', () => {
            this.socket.io.opts.transports = ['polling', 'websocket'];
        });

    }

    channel(channel_name){
        var nsp = io.of(channel_name);
        return this;
    }

    subscribe(channel_name){
        this.socket.emit('subscribe', channel_name);
        return this;
;    }

    unsubscribe(channel_name){
        this.socket.emit('unsubscribe', channel_name);
    }

    bind(event_name, callback){
        //console.log(callback);
        this.socket.on(event_name, callback);
    }

}

module.exports = DhakkaClient;
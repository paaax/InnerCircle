var Websocket = require('./websocket.js');

class Strategy{
           
    constructor(obj){
        this.name = obj.name,
        this.timeframe = obj.timeframe
    }

    run(){        
        ws = new Websocket();
        ws.run();
    }
}
module.exports = Strategy;
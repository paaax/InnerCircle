var Websocket = require('./websocket.js');

class Strategy{
           
    constructor(obj){
        this.name = obj.name,
        this.timeframe = obj.timeframe
    }

    run(){        
        let ws = new Websocket();
        ws.run();
    }
}
module.exports = Strategy;
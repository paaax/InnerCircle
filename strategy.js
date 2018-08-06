var Websocket = require('./websocket.js');

class Strategy{
           
    constructor(obj){
        this.name = obj.name,
        this.timeframe = obj.timeframe
    }

    run(obj){        
        let ws = new Websocket();
        ws.run(obj);
    }
}
module.exports = Strategy;
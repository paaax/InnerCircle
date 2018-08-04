var ws = require('./websocket.js');

class Strategy{
           
    constructor(obj){
        this.name = obj.name,
        this.timeframe = obj.timeframe
        ws.run(obj);
    }
    
}
module.exports = Strategy;
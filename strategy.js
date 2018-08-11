var Websocket = require('./websocket.js');

class Strategy{
           
    constructor(obj){
        this.name = obj.strategy,
        this.timeframe = obj.timeframe,
        this.websockets = []
    }

    run(obj){           
        let pairs = obj[0].pairs;   
        for (const k in pairs) {
            let ws = new Websocket();
            this.websockets.push(ws);
            ws.run(obj, pairs[k]);
        }
    }
}
module.exports = Strategy;
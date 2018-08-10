var Websocket = require('./websocket.js');

class Strategy{
           
    constructor(obj){
        this.name = obj.name,
        this.timeframe = obj.timeframe
    }

    run(obj){    
        for (const key in obj) {           
            var strat = obj[key];
            var pairs = strat.pairs;   
            for (const k in pairs) {
                let ws = new Websocket();
                ws.run(obj, pairs[k]);
            }
        }
    }
}
module.exports = Strategy;
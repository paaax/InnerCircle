var Strategy = require('./strategy.js');
var SignalEngine = require('./signalengine.js');

const binance = require('node-binance-api')().options({
    APIKEY: '<key>',        //obj.apikey
    APISECRET: '<secret>',  //obj.apisecret
    useServerTime: true, 
    test: true,
    verbose: false  
}); 

class Websocket{

    constructor(){
        this.active = false;
    }

    run(obj, pair){  
      
        var strat = obj[0];
        this.signalengine = new SignalEngine();
        this.signalengine.engine.pair = pair; 
        this.signalengine.strat = strat;
        this.signalengine.createRuleEngine();

        // run websocket
        binance.websockets.chart(this.signalengine.engine.pair.symbol, strat.timeframe, (symbol, interval, chart) => {
            let ticker = chart[binance.last(chart)];
            let arr = Object.keys(chart).map(function(k) { return chart[k] }); //TODO prüfen - kann man vllt auch über JSON lösen
            if(!ticker.hasOwnProperty('isFinal')){
                this.signalengine.initIndicators(arr);
                this.active = true;
            }
            if(this.active){
                console.log(this.signalengine.engine.pair.symbol+' '+ticker.close)
                this.signalengine.updateIndicators(ticker);
            }
        });

    }
}
module.exports = Websocket;
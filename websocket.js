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

    constructor(obj){
        this.active = false;
        this.signalengines = [] //TODO weg
    }

    run(obj, pair){  
        for (const key in obj) {           
            var strat = obj[key];
            var signalengine = new SignalEngine();
            this.signalengines.push(signalengine); //TODO weg
            signalengine.engine.pair = pair; 
            signalengine.strat = strat;
            signalengine.createRuleEngine();

            // run websocket
            binance.websockets.chart(signalengine.engine.pair.symbol, strat.timeframe, (symbol, interval, chart) => {
                let ticker = chart[binance.last(chart)];
                console.log(signalengine.engine.pair.symbol+' '+ticker.close)
                var arr = Object.keys(chart).map(function(k) { return chart[k] }); //TODO prüfen - kann man vllt auch über JSON lösen
                if(!ticker.hasOwnProperty('isFinal')){
                    signalengine.initIndicators(arr);
                    this.active = true;
                }
                if(this.active)
                    signalengine.updateIndicators(ticker);
            });
        }
    }
}
module.exports = Websocket;
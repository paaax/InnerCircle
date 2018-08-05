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
    }

    run(){  
        
        for (const key in this.obj) {           
            var strat = this.obj[key];
            var pairs = strat.pairs;

            for (const k in pairs) {
                var signalengine = new SignalEngine();
                const pair = pairs[k];   

                // create instances
                signalengine.configure(pair);

                // run websocket
                binance.websockets.chart(pair.symbol, this.obj[key].timeframe, (symbol, interval, chart) => {
                    let ticker = chart[binance.last(chart)];
                    var arr = Object.keys(chart).map(function(k) { return chart[k] }); //TODO prüfen - kann man vllt auch über JSON lösen
                    if(!ticker.hasOwnProperty('isFinal')){
                        signalengine.initIndicators(pair, arr);
                        this.active = true;
                    }
                    if(this.active)
                        signalengine.updateIndicators(ticker);
                });
            }
        }
    }
}
module.exports = Websocket;
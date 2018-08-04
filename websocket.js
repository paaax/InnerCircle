var Strategy = require('./strategy.js');
var Helper = require('./helper.js');

const binance = require('node-binance-api')().options({
    APIKEY: '<key>',        //obj.apikey
    APISECRET: '<secret>',  //obj.apisecret
    useServerTime: true, 
    test: true,
    verbose: false  
}); 

var active = false;
module.exports = {
    run(obj){  
        var helper = new Helper();
        for (const key in obj) {           
            var strat = obj[key];
            var pairs = strat.pairs;

            for (const k in pairs) {
                const pair = pairs[k];   

                // create instances
                helper.configure(pair);

                // run websocket
                console.log('obj.pair '+pair.symbol);

                binance.websockets.chart(pair.symbol, obj[key].timeframe, (symbol, interval, chart) => {
                    let ticker = chart[binance.last(chart)];
                    var arr = Object.keys(chart).map(function(k) { return chart[k] });
                    if(!ticker.hasOwnProperty('isFinal')){
                        helper.onNewCandle(arr);
                        active = true;
                    }
                    if(active)
                        helper.onNewTick(ticker);
                });
            }
        }
    }
}
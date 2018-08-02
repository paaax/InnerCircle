const binance = require('node-binance-api')().options({
    APIKEY: '<key>',
    APISECRET: '<secret>',
    useServerTime: true, 
    test: true,
    verbose: false
  
  });

var strat = require('./strategy.js');
var active = false;

binance.websockets.chart("BTCUSDT", "1m", (symbol, interval, chart) => {
    let tick = binance.last(chart);
    let ticker = chart[tick];
    var arr = Object.keys(chart).map(function(k) { return chart[k] });
    if(!ticker.hasOwnProperty('isFinal')){
        strat.onNewCandle(arr);
        active = true;
    }
    if(active)
        strat.onNewTick(ticker);
});
let RuleEngine = require('json-rules-engine');
let highlow = require('./indicators/highlow.js');

var strat = {}
var HighLow = null;
var engine = null;

strat.onNewCandle = function(candles){
    HighLow = new highlow(50);
    HighLow.setLevels(candles);

    engine = new RuleEngine.Engine();
    if(HighLow.side==='short'){
        var shortRule = new RuleEngine.Rule({
            conditions: {
                all: [{
                    fact: 'support',
                    operator: 'lessThan',
                    value: HighLow.lvlLow
                }]
            },
            event: {
                type: 'short',
                params: {
                    message: 'Go short'
                }
            },            
        })
        engine.addRule(shortRule);
    }

    else if(HighLow.side==='long'){
        var longRule = new RuleEngine.Rule({
            conditions: {
                all: [{
                    fact: 'resistance',
                    operator: 'greaterThan',
                    value: HighLow.lvlHigh
                }]
            },
            event: {
                type: 'long',
                params: {
                    message: 'Go long'
                }
            },            
        })
        engine.addRule(longRule);
    }

    engine.on('success', function(event, almanac, ruleResult) {
        if(ruleResult.result){
            engine.stop();
            console.log('Rule for '+event.type+' successful.')
        }
    })
    
    engine.on('failure', function(event, almanac, ruleResult) {
        if(!ruleResult.result){
            engine.stop();
            console.log('Rule for '+event.type+' failed.')
        }
    })  

    console.log("Engine for new candle initialized. "+HighLow.side+" trigger active.");  
}

strat.onNewTick = async function(tick){
    if(HighLow.side==='long'){
        console.log('Actual level to break '+HighLow.lvlHigh+'. Current level '+tick.close);
        engine.addFact('resistance', tick.close)
    }
    else if(HighLow.side==='short'){
        console.log('Actual level to break '+HighLow.lvlLow+'. Current level '+tick.close);
        engine.addFact('support', tick.close)
    }
    
    console.log("Engine running. Waiting for facts...");
    await engine.run();
}

module.exports = strat;
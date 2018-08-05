var RuleEngine = require('json-rules-engine');

class SignalEngine{
    constructor(){
        this.engine = new RuleEngine.Engine(); 
    }

    configure(pair){
        this.createRuleEngine(pair);
    }

    createRuleEngine(pair){
        var rules = pair.rules;

        // rules
        for (const key in rules) {
            const rulesettings = rules[key];              
            let rule = new RuleEngine.Rule({
                conditions: {
                    all: [{
                        fact: rulesettings.indicator,
                        operator: rulesettings.operator,
                        value: rulesettings.condition
                    }]
                },
                event: {
                    type: 'signal',
                    params: {
                        message: 'long'
                    }
                },
            })
            this.engine.addRule(rule);
        }

        // events
        this.engine.on('success', function(event, almanac, ruleResult) {
            if(ruleResult.result){
                engine.stop();
                console.log('Rule for '+event.type+' successful.')
            }
        })
        
        this.engine.on('failure', function(event, almanac, ruleResult) {
            if(!ruleResult.result){
                engine.stop();
                console.log('Rule for '+event.type+' failed.')
            }
        })  
    }

    initIndicators(pair, priceData){
        var rules = pair.rules;
        for (const key in rules) {
            const rule = rules[key];
            var Indi = require('./indicators/'+rule.indicator+'.js');   
            var indicator = new Indi(); //TODO rulesettings aus JSON holen z.B. period
            this.indicatorList.push(indicator);
            return indicator.getValue(priceData);
        }
    }
    
    updateIndicators(tick){
        for (let i = 0; i < this.indicators.length-1; i++) {
            const indicator = this.indicators[i];
            return indicator.update(tick);            
        }
    }
}

module.exports = SignalEngine;
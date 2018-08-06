var RuleEngine = require('json-rules-engine');
var Indicator = require('./indicator.js');

class SignalEngine{
    constructor(){
        this.engine = new RuleEngine.Engine(); 
        this.indicators = [];
        this.facts = [];
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
                        fact: rulesettings.fact,
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
            var indicator = new Indicator(rule.settings);
            this.indicators.push(indicator);
        }
    }
    
    updateIndicators(tick){
        for (let i = 0; i < this.indicators.length-1; i++) {
            const indicator = this.indicators[i];
            var result = indicator.update(tick);
            this.engine.addFact(result.fact, result.result);            
        }
        this.engine.run();
    }
}

module.exports = SignalEngine;
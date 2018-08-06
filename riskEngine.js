var RuleEngine = require('json-rules-engine');

class RiskEngine{
    constructor(){
        this.engine = new RuleEngine.Engine(); 
    }

    createRuleEngine(riskManagerRules){
    
        for (const key in riskManagerRules)
        {
            
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
                        message: 'short'
                    }
                },
            })
            this.engine.addRule(rule);
        }

        // events
        this.engine.on('success', function(event, almanac, ruleResult) {
            if(ruleResult.result){
                engine.stop();
                console.log('RiskRule for '+event.type+' successful.')
            }
        })
        
        this.engine.on('failure', function(event, almanac, ruleResult) {
            if(!ruleResult.result){
                engine.stop();
                console.log('RiskRule for '+event.type+' failed.')
            }
        })  
    }

    initIndicators(pair)
    {
        var rules = pair.riskManagerRules;
        for (const key in rules)
        {
            const rule = rules[key];
            var Indi = require('./riskmanagers/'+rule.indicator+'.js');   
            var indicator = new Indi(); //TODO rulesettings aus JSON holen z.B. period
            this.indicatorList.push(indicator);
            return indicator.getValue(priceData);
        }        
    }
    
    updateIndicators()
    {
        for (let i = 0; i < this.indicators.length-1; i++)
        {
            const indicator = this.indicators[i];
            return indicator.update(tick);            
        }
    }
}

module.exports = RiskEngine;
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

    initIndicators()
    {

    }
    
    updateIndicators()
    {

    }
}

module.exports = RiskEngine;
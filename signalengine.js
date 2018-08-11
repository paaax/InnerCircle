var RuleEngine = require('json-rules-engine');
var Indicator = require('./indicator.js');

class SignalEngine{
    constructor(){
        this.engine = new RuleEngine.Engine(); 
        this.indicators = [];
        this.facts = [];
    }

    createRuleEngine(){
        
        // rules
        let rules = this.strat.rules;
        for (const key in rules) {
            const rule = rules[key];              
            let engineRule = new RuleEngine.Rule(this.getSexyRuleObject(rule))
            this.engine.addRule(engineRule);
        }

        // events
        this.engine.on('success', function(event, almanac, ruleResult) {
            if(ruleResult.result){
                this.stop();
                console.log('Rule for '+this.pair.symbol+' successful.')
            }
        })
        
        this.engine.on('failure', function(event, almanac, ruleResult) {
            if(!ruleResult.result){
                this.stop();
                console.log('Rule for '+this.pair.symbol+' failed.')
            }
        })  
    }

    initIndicators(candles){
        let rules = this.strat.rules;
        for (const key in rules) {
            const rule = rules[key]; 
            for (const key in rule.facts) {
                let fact = rule.facts[key]
                let indicator = new Indicator(fact);
                indicator.set(candles);
                this.indicators.push(indicator);
            }
        }
    }
    
    updateIndicators(tick){
        for (const key in this.indicators) {
            let indicator = this.indicators[key];
            let result = indicator.update(tick);
            this.engine.addFact(result.fact, result.result);   
        }
        this.engine.run();
    }

    getSexyRuleObject(rule){
        var engineRule = {}
        let conditions = {} 
        let facts = []
        
        //for loop facts
        for (const key in rule.facts) {
            let fact = {}
            const element = rule.facts[key];
            fact.fact = element.fact;
            fact.operator = element.operator,
            fact.value = element.condition,
            facts.push(fact);
        }
        conditions[rule.condition] = facts; // ALL / ANY
        engineRule.conditions = conditions;
        return engineRule;
    }
}

module.exports = SignalEngine;
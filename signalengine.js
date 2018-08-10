var RuleEngine = require('json-rules-engine');
var Indicator = require('./indicator.js');

class SignalEngine{
    constructor(){
        this.engine = new RuleEngine.Engine(); 
        this.indicators = [];
        this.facts = [];
    }

    // configure(strat, pair){
    //     this.engine.pair = pair;
    //     this.createRuleEngine(strat);
    // }

    createRuleEngine(){
        var rules = this.strat.rules;
        //this.engine.pair = this.pair;

        // rules
        for (const key in rules) {
            const rulesettings = rules[key];              
            let rule = new RuleEngine.Rule(this.getSexyRuleObject(rulesettings))
            this.engine.addRule(rule);
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

    initIndicators(priceData){
        var rules = this.strat.rules;
        for (const key in rules) {
            const rule = rules[key]; 
            for (const key in rule.facts) {
                var fact = rule.facts[key]
                var indicator = new Indicator(fact);
                this.indicators.push(indicator);
            }
        }
    }
    
    updateIndicators(tick){
        for (const key in this.indicators) {
            var indicator = this.indicators[key];
            var result = indicator.update(tick);
            this.engine.addFact(result.fact, result.result);   
        }
        this.engine.run();
    }

    getSexyRuleObject(obj){
        var rule = {}
        var conditionsObj = {} 
        var arrFact = []
        
        //for loop facts
        for (const key in obj.facts) {
            var fact = {}
            const element = obj.facts[key];
            fact.fact = element.fact;
            fact.operator = element.operator,
            fact.value = element.condition,
            arrFact.push(fact);
        }
        conditionsObj[obj.condition] = arrFact; // ALL / ANY generisch erzeugt
        rule.conditions = conditionsObj;
        return rule;
    }
}

module.exports = SignalEngine;
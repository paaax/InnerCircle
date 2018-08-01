let RuleEngine = require('json-rules-engine');

let engine = new RuleEngine.Engine();
let rule = new RuleEngine.Rule({
    conditions: {
        all: [{
            fact: 'testindicator',
            operator: 'greaterThan',
            value: 10
        }]
    },
    event: {
        type: 'signal',
        params: {
            message: 'long'
        }
    },
})

engine.addRule(rule)
let testindicator = 12
engine.addFact('testindicator', testindicator)

engine.on('success', function(event, almanac, ruleResult) {
    if(ruleResult.result)
        console.log('Rule successful.')
})

engine.on('failure', function(event, almanac, ruleResult) {
    if(!ruleResult.result)
        console.log('Rule failed.')
})

engine.run();
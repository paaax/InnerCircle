var RuleEngine = require('json-rules-engine');
const util = require('util')

class Helper{
    constructor(){
        this.engine = new RuleEngine.Engine(); 
    }

    configure(pair){
        this.createRuleEngine(pair);
    }

    createRuleEngine(pair){
        var rules = pair.rules;
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
        console.log(util.inspect(this.engine, {showHidden: false, depth: null}))

        // alternative shortcut
        console.log(util.inspect(this.engine, false, null))
    }
}
module.exports = Helper;
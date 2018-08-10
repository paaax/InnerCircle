var Strategy = require('./strategy.js');
var jsonObj = [
    {
        "strategy": "blablub",
        "timeframe": "1m",
        "pairs":[
            {
                "symbol": "BTCUSDT"
            },
            {
                "symbol": "ETHUSDT"
            }
        ],
        "rules": [{
            "condition": "all",
            "signal": "long",
            "facts": [{
                "indicator": {
                    "name": "highlow",
                },
                "fact": "highlow_short",
                "operator": "greaterThan",
                "condition": "exampleLevel",
            },
            {
                "indicator": {
                    "name": "rsi",
                    "inputs": [{
                        "period": "25"
                    },
                    {
                        "period": "25"
                    }]
                },
                "fact": "highlow_long",
                "operator": "greaterThan",
                "condition": "20",
            }]
        }], 
        "riskManagerRules": [
            {
                "riskManagerStrat": "rm_strat_1",
                "operator": "greaterThan",
                "condition": "blub",
                "signal": "do something"
            },
            {
                "riskManagerStrat": "rm_strat_2",
                "operator": "greaterThan",
                "condition": "blub",
                "signal": "do something else"
            }
        ]                    
    }
];

var strategy = new Strategy(jsonObj);
strategy.run(jsonObj);
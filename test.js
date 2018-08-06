var Strategy = require('./strategy.js');
var jsonObj = [
    {
        "strategy": "blablub",
        "timeframe": "1m",
        "pairs":[
            {
                "symbol": "BTCUSDT",
                "rules": [
                    {
                        "indicator": "highlow",
                        "operator": "greaterThan",
                        "condition": "exampleLevel",
                        "signal": "short"
                    },
                    {
                        "indicator": "rsi",
                        "operator": "greaterThan",
                        "condition": "20",
                        "signal": "long"
                    }                    
                ]
            },
            {
                "symbol": "ETHUSDT",
                "rules": [
                    {
                        "indicator": "highlow",
                        "operator": "greaterThan",
                        "condition": "exampleLevel",
                        "signal": "short"
                    },
                    {
                        "indicator": "rsi",
                        "operator": "greaterThan",
                        "condition": "20",
                        "signal": "long"
                    }                    
                ]
            }
        ],
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
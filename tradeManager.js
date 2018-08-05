var RiskEngine = require('./riskEngine.js');
var RuleEngine = require('json-rules-engine');

class TradeManager{
           
    constructor()
    {
        
    }

    trade()
    {
        let PoSi = getPositionSize();
        //binance.doTheActualTrade(PoSi usw usw usw)
        var riskEngine = new RiskEngine();
        riskEngine.initIndicators();
    }

    createPoSi()
    {
        // Calculate PoSi and return it???
    }


}
module.exports = TradeManager;
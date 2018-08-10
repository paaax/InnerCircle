class rsi{
    constructor(fact){
        this.lvlHigh = 0;
        this.lvlLow = 0;
        this.lowToBreak = 0;
        this.highToBreak = 0;
        this.maxHigh = 0;
        this.maxLow = 0;  
        this.side = null; 
        this.input = fact.indicator;
        this.fact = fact.fact;
    }

    set(candles){
        for(var i=candles.length-this.input.period; i<candles.length; i++)
            this.update(candles[i]);    
    }

    update(tick){

        var result = 123 //TODO
        
        return {
            fact: this.fact,
            result: result,
            side: this.side
        }
    }
}
module.exports = rsi;
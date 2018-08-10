class highlow{
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

        if(tick.high > this.maxHigh){
            this.maxHigh = tick.high;
            this.lowToBreak = this.lvlLow;
            this.side = 'short';
        }
        if(tick.low < this.maxLow){ //TODO maxLow = 0 <- beheben
            this.maxLow = tick.low;
            this.highToBreak = this.lvlHigh;
            this.side = 'long';
        }

        if(tick.close > tick.open)
            this.lvlHigh = tick.high;
        else if(tick.close < tick.open)
            this.lvlLow = tick.low;   

        if(this.side==='long')
            var result = this.highToBreak;
        else
            var result = this.lowToBreak;
        
        return {
            fact: this.fact,
            result: result,
            side: this.side
        }
    }
}
module.exports = highlow;
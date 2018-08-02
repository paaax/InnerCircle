function indicator(period){
    this.lvlHigh = 0;
    this.lvlLow = 0;
    this.lowToBreak = 0;
    this.highToBreak = 0;
    this.maxHigh = 0;
    this.maxLow = 0;  
    this.side = null; 
    this.len = period;
}

indicator.prototype.setLevels = function(candles){
    for(var i=candles.length-this.len; i<candles.length; i++){
        this.updateLevel(candles[i]);
    }
    //candles.forEach(element => updateLevel(element));
}

indicator.prototype.updateLevel = function(element){

    if(element.high > this.maxHigh){
        this.maxHigh = element.high;
        this.lowToBreak = this.lvlLow;
        this.side = 'short';
    }
    if(element.low < this.maxLow){
        this.maxLow = element.low;
        this.highToBreak = this.lvlHigh;
        this.side = 'long';
    }

    if(element.close > element.open)
        this.lvlHigh = element.high;
    else if(element.close < element.open)
        this.lvlLow = element.low;    
}

module.exports = indicator;
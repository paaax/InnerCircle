class Indicator{
    constructor(fact){
        this.indicator = fact.indicator.name;
        this.fact = fact.fact;
        this.Indi = require('./indicators/'+this.indicator+'.js');
        this.indi = new this.Indi(fact);
    }

    set(candles){
        this.indi.set(candles);
    }

    update(tick){
        return this.indi.update(tick);
    }
}
module.exports = Indicator;
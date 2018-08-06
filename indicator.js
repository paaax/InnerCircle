class Indicator{
    constructor(obj){
        this.name = obj.name;
        this.fact = obj.fact
        this.Indi = require('./indicators/'+this.name+'.js');
        this.indi = new this.Indi(obj);
    }

    set(candle){
        this.indi.set(candle);
    }

    update(tick){
        return this.indi.update(tick);
    }
}
module.exports = Indicator;
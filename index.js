'use strict'

const async = require('async');
const Decimal = require('decimal.js');
Decimal.set({ precision: 2 });

class ATR {
    constructor(values, period) {
        if (!Array.isArray(values)) {
            throw new Error('values param should be an array');
        }

        this.values = values;
        this.data = [];
        this.period = period;
    }

    calculate(callback) {
        async.series([
                (next) => this.highsMinusLows(next),
                (next) => this.currentHighMinusPrevClose(next),
                (next) => this.currentLowMinusPrevClose(next),
                (next) => this.calculateTR(next),
                (next) => this.calculateATR(next)
            ],
            (err, results) => {
                if (err) {
                    return callback(err);
                }
                callback(null, results[4]);
            });
    }

    highsMinusLows(callback) {
        this.data = this.values;
        this.data.forEach((val, idx) => {
            this.data[idx].highLowDiff = Decimal.sub(val.high, val.low).toNumber();
        });

        callback();
    }

    currentHighMinusPrevClose(callback) {
        this.data.forEach((val, idx) => {
            if (idx === 0) {
                this.data[idx].highCloseDiff = null;
            } else {
                this.data[idx].highCloseDiff =
                    Decimal.abs(
                        Decimal.sub(val.high, this.data[idx - 1].close)
                    ).toNumber();
            }
        });

        callback();
    }

    currentLowMinusPrevClose(callback) {
        this.data.forEach((val, idx) => {
            if (idx === 0) {
                this.data[idx].lowCloseDiff = null;
            } else {
                this.data[idx].lowCloseDiff = Decimal.abs(
                    Decimal.sub(val.low, this.data[idx - 1].close)).toNumber();
            }
        });

        callback();
    }

    calculateTR(callback) {
        this.data.forEach((val, idx) => {
            if (idx === 0) {
                this.data[idx].tr = this.data[idx].highLowDiff;
            } else if (this.data[idx].highLowDiff > this.data[idx].highCloseDiff && this.data[idx].highLowDiff > this.data[idx].lowCloseDiff) {
                this.data[idx].tr = this.data[idx].highLowDiff;
            } else if (this.data[idx].highCloseDiff > this.data[idx].highLowDiff  && this.data[idx].highCloseDiff > this.data[idx].lowCloseDiff) {
                this.data[idx].tr = this.data[idx].highCloseDiff;
            } else {
                this.data[idx].tr = this.data[idx].lowCloseDiff;
            }
        });

        callback();
    }

    calculateATR(callback) {
        let trTotal = 0;
        this.data.forEach((val, idx) => {
            if (idx <= (this.period -1)) {
                trTotal = Decimal.add(this.data[idx].tr, trTotal).toNumber();
                if (idx === (this.period - 1)) {
                    this.data[idx].atr = Decimal.div(trTotal, this.period).toNumber();
                }
            } else if (idx > (this.period -1)) {

                this.data[idx].atr =
                    Decimal.div(
                        Decimal.add(
                            Decimal.mul((this.period - 1), this.data[idx-1].atr),
                            this.data[idx].tr), this.period
                    ).toNumber();
            } else {
                this.data[idx].atr = null;
            }
        });
        return callback(null, this.data);
    }
}

module.exports = ATR;

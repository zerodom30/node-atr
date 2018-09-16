'use strict'

const assert = require('assert');
const ATR = require('../index');

describe('ATR Indicator', () => {
    describe('highsMinusLows', () => {
        it('should throw error', () => {
            const atr = () => new ATR('data', 14);
            assert.throws(atr, Error, 'values param should be an array');
        });
        
        it('should calculate highsMinusLows', (done) => {
            const data = [
                { high: 48.70, low: 47.79,	close: 48.16 },
                { high: 48.72, 	low: 48.14, close:48.61 },
                { high: 48.90,	low: 48.39,	close: 48.75 },
                { high: 48.87,	low: 48.37,	close: 48.63 },
                { high: 48.82,	low: 48.24,	close: 48.74 },
                { high: 49.05,	low: 48.64, close: 49.03 },
                { high: 49.20,	low: 48.94,	close: 49.07 }
            ];
            const expected = [
                { high: 48.70,	low: 47.79, close: 48.16, highLowDiff: 0.91 },
                { high: 48.72, 	low: 48.14, close: 48.61, highLowDiff: 0.58 },
                { high: 48.90,	low: 48.39,	close: 48.75, highLowDiff: 0.51 },
                { high: 48.87,	low: 48.37,	close: 48.63, highLowDiff: 0.5 },
                { high: 48.82,	low: 48.24,	close: 48.74, highLowDiff: 0.58 },
                { high: 49.05,	low: 48.64, close: 49.03, highLowDiff: 0.41 },
                { high: 49.20,	low: 48.94,	close: 49.07, highLowDiff: 0.26 }
            ];

            const atr = new ATR(data, 14);
            atr.highsMinusLows((err) => {
                assert.deepEqual(atr.data, expected);
                done();
            });
        });
    });

    describe('average true range', () => {
        it('should calculate Average True Range', (done) => {
            const data = [
                { high: 48.70, low: 47.79,	close: 48.16 },
                { high: 48.72, 	low: 48.14, close:48.61 },
                { high: 48.90,	low: 48.39,	close: 48.75 },
                { high: 48.87,	low: 48.37,	close: 48.63 },
                { high: 48.82,	low: 48.24,	close: 48.74 },
                { high: 49.05,	low: 48.64, close: 49.03 },
                { high: 49.20,	low: 48.94,	close: 49.07 },
                { high: 49.35,	low: 48.86, close: 49.32 },
                { high: 49.92, 	low: 49.50,	close: 49.91 },
                { high: 50.19,	low: 49.87,	close: 50.13 },
                { high: 50.12,	low: 49.20,	close: 49.53 },
                { high: 49.66,	low: 48.90,	close: 49.50 },
                { high: 49.88,	low: 49.43,	close: 49.75 },
                { high: 50.19,	low: 49.73,	close: 50.03 },
                { high: 50.36,	low: 49.26,	close: 50.31 },
                { high: 50.57,	low: 50.09,	close: 50.52 },
                { high: 50.65,	low: 50.30,	close: 50.41 },
                { high: 50.43,	low: 49.21,	close: 49.34 },
                { high: 49.63,	low: 48.98,	close: 49.37 },
                { high: 50.33,	low: 49.61,	close: 50.23 },
                { high: 50.29,	low: 49.20,	close: 49.24 },
                { high: 50.17,	low: 49.43,	close: 49.93 },
                { high: 49.32,	low: 48.08,	close: 48.43 },
                { high: 48.50,	low: 47.64,	close: 48.18 },
                { high: 48.32,	low: 41.55,	close: 46.57 },
                { high: 46.80, 	low: 44.28,	close: 45.41 },
                { high: 47.80,	low: 47.31,	close: 47.77 },
                { high: 48.39,	low: 47.20,	close: 47.72 },
                { high: 48.66,	low: 47.90, close: 48.62 },
                { high: 48.79,	low: 47.73,	close: 47.85 }
            ];
            const expected = [
                { high: 48.70,	low: 47.79, close: 48.16, highLowDiff: 0.91, highCloseDiff: null, lowCloseDiff: null, tr: 0.91 },
                { high: 48.72, 	low: 48.14, close: 48.61, highLowDiff: 0.58, highCloseDiff: 0.56, lowCloseDiff: 0.02, tr: 0.58 },
                { high: 48.90,	low: 48.39,	close: 48.75, highLowDiff: 0.51, highCloseDiff: 0.29, lowCloseDiff: 0.22, tr: 0.51 },
                { high: 48.87,	low: 48.37,	close: 48.63, highLowDiff: 0.5,	highCloseDiff: 0.12, lowCloseDiff: 0.38, tr: 0.50 },
                { high: 48.82,	low: 48.24,	close: 48.74, highLowDiff: 0.58, highCloseDiff: 0.19, lowCloseDiff: 0.39, tr: 0.58 },
                { high: 49.05,	low: 48.64, close: 49.03, highLowDiff: 0.41, highCloseDiff: 0.31, lowCloseDiff: 0.1, tr: 0.41 },
                { high: 49.20,	low: 48.94,	close: 49.07, highLowDiff: 0.26, highCloseDiff: 0.17, lowCloseDiff: 0.09, tr: 0.26 },
                { high: 49.35,	low: 48.86, close: 49.32, highLowDiff: 0.49, highCloseDiff: 0.28, lowCloseDiff: 0.21, tr: 0.49 },
                { high: 49.92, 	low: 49.50,	close: 49.91, highLowDiff: 0.42, highCloseDiff: 0.60, lowCloseDiff: 0.18, tr: 0.60 },
                { high: 50.19,	low: 49.87,	close: 50.13, highLowDiff: 0.32, highCloseDiff: 0.28, lowCloseDiff: 0.04, tr: 0.32 },
                { high: 50.12,	low: 49.20,	close: 49.53, highLowDiff: 0.92, highCloseDiff: 0.01, lowCloseDiff: 0.93, tr: 0.93 },
                { high: 49.66,	low: 48.90,	close: 49.50, highLowDiff: 0.76, highCloseDiff: 0.13, lowCloseDiff: 0.63, tr: 0.76 },
                { high: 49.88,	low: 49.43,	close: 49.75, highLowDiff: 0.45, highCloseDiff: 0.38, lowCloseDiff: 0.07, tr: 0.45 },
                { high: 50.19,	low: 49.73,	close: 50.03, highLowDiff: 0.46, highCloseDiff: 0.44, lowCloseDiff: 0.02, tr: 0.46, atr: 0.56 },
                { high: 50.36,	low: 49.26,	close: 50.31, highLowDiff: 1.1,	highCloseDiff: 0.33, lowCloseDiff: 0.77, tr: 1.10, atr:	0.6 },
                { high: 50.57,	low: 50.09,	close: 50.52, highLowDiff: 0.48, highCloseDiff: 0.26, lowCloseDiff: 0.22, tr: 0.48, atr: 0.59 },
                { high: 50.65,	low: 50.30,	close: 50.41, highLowDiff: 0.35, highCloseDiff: 0.13, lowCloseDiff: 0.22, tr: 0.35, atr: 0.58 },
                { high: 50.43,	low: 49.21,	close: 49.34, highLowDiff: 1.2, highCloseDiff: 0.02, lowCloseDiff: 1.20, tr: 1.2,	atr: 0.62 },
                { high: 49.63,	low: 48.98,	close: 49.37, highLowDiff: 0.65, highCloseDiff: 0.29, lowCloseDiff: 0.36, tr: 0.65, atr: 0.63 },
                { high: 50.33,	low: 49.61,	close: 50.23, highLowDiff: 0.72, highCloseDiff: 0.96, lowCloseDiff: 0.24, tr: 0.96, atr: 0.66 },
                { high: 50.29,	low: 49.20,	close: 49.24, highLowDiff: 1.1, highCloseDiff: 0.06, lowCloseDiff: 1, tr: 1.1, atr: 0.69 },
                { high: 50.17,	low: 49.43,	close: 49.93, highLowDiff: 0.74, highCloseDiff: 0.93, lowCloseDiff: 0.19, tr: 0.93, atr: 0.71 },
                { high: 49.32,	low: 48.08,	close: 48.43, highLowDiff: 1.2, highCloseDiff: 0.61, lowCloseDiff: 1.9, tr: 1.9, atr: 0.79 },
                { high: 48.50,	low: 47.64,	close: 48.18, highLowDiff: 0.86, highCloseDiff: 0.07, lowCloseDiff: 0.79, tr: 0.86, atr: 0.79 },
                { high: 48.32,	low: 41.55,	close: 46.57, highLowDiff: 6.8, highCloseDiff: 0.14, lowCloseDiff: 6.6, tr: 6.8, atr: 1.2 },
                { high: 46.80, 	low: 44.28,	close: 45.41, highLowDiff: 2.5, highCloseDiff: 0.23, lowCloseDiff: 2.3, tr: 2.5, atr: 1.4 },
                { high: 47.80,	low: 47.31,	close: 47.77, highLowDiff: 0.49, highCloseDiff: 2.4, lowCloseDiff: 1.90, tr: 2.4, atr: 1.4 },
                { high: 48.39,	low: 47.20,	close: 47.72, highLowDiff: 1.2, highCloseDiff: 0.62, lowCloseDiff: 0.57, tr: 1.2,	atr: 1.4 },
                { high: 48.66,	low: 47.90, close: 48.62, highLowDiff: 0.76, highCloseDiff: 0.94, lowCloseDiff: 0.18, tr: 0.94, atr: 1.4 },
                { high: 48.79,	low: 47.73,	close: 47.85, highLowDiff: 1.1, highCloseDiff: 0.17, lowCloseDiff: 0.89, tr: 1.1, atr: 1.4 }
            ];

            const atr = new ATR(data, 14);
            atr.calculate((err, data) => {
                assert.deepEqual(data, expected);
                done();
            });
        });
    });
});

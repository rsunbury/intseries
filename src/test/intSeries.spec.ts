import 'mocha';
import { expect } from 'chai';

import {
         intSeriesHas,
         intSeriesAddValue,
         intSeriesRemoveValue,
         intSeriesTest,
         intSeriesToSet,
         intCollectionToString,
         intSeriesOverlap
} from '../intSeries';

describe('intSeries functions', () => {
    describe('intSeries', () => {
        describe('intSeries === "ALL"', () => {
            it('should return true regardless of number', () => {
                expect(intSeriesHas('ALL', Math.floor(Math.random() * 9999))).to.be.true;
            });
        });
        describe('intSeries === "NONE"', () => {
            it('should return false regardless of number', () => {
                expect(intSeriesHas('NONE', Math.floor(Math.random() * 9999))).to.be.false;
            });
        });
        describe('intSeries string of values', () => {
            const intSeries = '1-5,20,30,40-999';
            it('should return true if number in intSeries', () => {
                expect(intSeriesHas(intSeries, 1)).to.be.true;
                expect(intSeriesHas(intSeries, 3)).to.be.true;
                expect(intSeriesHas(intSeries, 20)).to.be.true;
                expect(intSeriesHas(intSeries, 999)).to.be.true;
            });
            it('should return false if number not in intSeries', () => {
                expect(intSeriesHas(intSeries, 0)).to.be.false;
                expect(intSeriesHas(intSeries, 6)).to.be.false;
                expect(intSeriesHas(intSeries, 1000)).to.be.false;
            });
        });
        describe('Error conditions', () => {
            it('should throw error for a invalid range (e.g. 9-7)', () => {
                expect(() => {
                    intSeriesHas('9-7', 9);
                }).to.throw('Invalid range 9-7');
            });
        });
    });
    describe('intSeriesTest', () => {
        describe('Invalid intSeries', () => {
            it('should throw error for invalid characters in intSeries', () => {
                expect(() => {
                    intSeriesTest('7&9');
                }).to.throw('Invalid intSeries 7&9');
                expect(() => {
                    intSeriesTest('7-9 ');
                }).to.throw('Invalid intSeries 7-9 ');
                expect(() => {
                    intSeriesTest(' 7-9');
                }).to.throw('Invalid intSeries  7-9');
                expect(() => {
                    intSeriesTest(' ');
                }).to.throw('Invalid intSeries  ');
            });
        });
        describe('Valid intSeries', () => {
            it('should not throw error if intSeries is valid', () => {
                expect(() => {
                    intSeriesTest('7-9');
                }).to.not.throw();
                expect(() => {
                    intSeriesTest('7-9,10');
                }).to.not.throw();
                expect(() => {
                    intSeriesTest('');
                }).to.not.throw();
                expect(() => {
                    intSeriesTest('all');
                }).to.not.throw();
                expect(() => {
                    intSeriesTest('ALL');
                }).to.not.throw();
                expect(() => {
                    intSeriesTest('NONE');
                }).to.not.throw();
                expect(() => {
                    intSeriesTest('none');
                }).to.not.throw();
            });
        });
    });
    describe('intSeriesToSet', () => {
        it('should return the correct set', () => {
            const testSet = intSeriesToSet('0-5,10');
            expect(intSeriesToSet('').size).to.equal(0);
            expect(intSeriesToSet('none').size).to.equal(0);
            expect(testSet.size).to.equal(7);
            expect(testSet.has(3)).to.be.true;
            expect(testSet.has(0)).to.be.true;
            expect(testSet.has(5)).to.be.true;
            expect(testSet.has(10)).to.be.true;
        });
        it('should return error if bad range', () => {
            expect(() => {
                intSeriesHas('9-7', 9);
            }).to.throw('Invalid range 9-7');
        });
    });
    describe('intSeriesCollectionToString', () => {
        const testArray = [0, 1, 2, 3, 4, 50, 52];
        it('should return the correct string representation of a Set', () => {
            const testSet = new Set(testArray);
            expect(intCollectionToString(testSet)).to.equal('0-4,50,52');
        });
        it('should return the correct string representation of an Array', () => {
            expect(intCollectionToString(testArray)).to.equal('0-4,50,52');
        });
    });
    describe('intSeriesRemoveValue', () => {
        const testList = '0-20,60';
        it('should return intSeries with value removed', () => {
            expect(intSeriesRemoveValue(9999, testList, 15)).to.equal('0-14,16-20,60');
            expect(intSeriesRemoveValue(9999, testList, 0)).to.equal('1-20,60');
            expect(intSeriesRemoveValue(9999, testList, 60)).to.equal('0-20');
            expect(intSeriesRemoveValue(9999, 'NONE', 60)).to.equal('NONE');
            expect(intSeriesRemoveValue(9999, 'ALL', 60)).to.equal('0-59,61-9999');
        });
    });
    describe('intSeriesAddValue', () => {
        const testList = '1-20,22-50,60';
        it('should return intSeries with value added', () => {
            expect(intSeriesAddValue(testList, 0)).to.equal('0-20,22-50,60');
            expect(intSeriesAddValue(testList, 55)).to.equal('1-20,22-50,55,60');
            expect(intSeriesAddValue(testList, 21)).to.equal('1-50,60');
            expect(intSeriesAddValue(testList, 61)).to.equal('1-20,22-50,60-61');
            expect(intSeriesAddValue('ALL', 8)).to.equal('ALL');
            expect(intSeriesAddValue('NONE', 8)).to.equal('8');
            expect(intSeriesAddValue('', 8)).to.equal('8');
        });
    });
    describe('intSeriesOverlap', () => {
        it('should return true if intSeries overlap', () => {
            expect(intSeriesOverlap('0-20', '0')).to.be.true;
            expect(intSeriesOverlap('0-20', '20-30')).to.be.true;
            expect(intSeriesOverlap('0-20', '19')).to.be.true;
            expect(intSeriesOverlap('0-20,55', '0,50-60')).to.be.true;
            expect(intSeriesOverlap('0-20,55', '55')).to.be.true;
            expect(intSeriesOverlap('ALL', '65-70')).to.be.true;
            expect(intSeriesOverlap('61-70', 'ALL')).to.be.true;
        });
        it('should return false if intSeries overlap', () => {
            expect(intSeriesOverlap('1-20', '0')).to.be.false;
            expect(intSeriesOverlap('0-20', '21-30')).to.be.false;
            expect(intSeriesOverlap('1-20,55', '0,50-54,56-60')).to.be.false;
            expect(intSeriesOverlap('0-9999', 'NONE')).to.be.false;
            expect(intSeriesOverlap('ALL', 'NONE')).to.be.false;
            expect(intSeriesOverlap('NONE', 'ALL')).to.be.false;
        });
    });
});

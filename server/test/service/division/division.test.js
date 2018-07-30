const expect = require('chai').expect; 
const divisionCalc = require('../../../service/division/division');
const {ElementLongerThanReferenceError, InfiniteLoopBreakerError} = require('../../../service/division/errors');

describe('given calculate division', () => {
    describe('when has elements that gives only one instance of pattern', () => {
        let data;
        let referenceLength;

        beforeEach(() => {
            referenceLength = 12000;

            data = [
                { length: 1250, count: 4 },
                { length: 3500, count: 5 },
                { length: 2700, count: 5 },
                { length: 2000, count: 5 }
            ];
        });

        it('should calculate division', () => {
            const result = divisionCalc.calculateDivision(data, referenceLength);

            const expected = [
                { elements: [3500, 3500, 3500, 1250], count: 1 },
                { elements: [3500, 3500, 2700, 2000], count: 1 },
                { elements: [2700, 2700, 2700, 2700], count: 1 },
                { elements: [2000, 2000, 2000, 2000, 1250, 1250, 1250], count: 1 }
            ];

            expect(result).to.deep.equal(expected);
        });
    });

    describe('when one of the elements is longer than reference', () => {
        let data;
        let referenceLength;

        beforeEach(() => {
            referenceLength = 12000;

            data = [
                { length: 12001, count: 4 },
                { length: 3500, count: 5 },
                { length: 2700, count: 5 },
                { length: 2000, count: 5 }
            ];
        });

        it('should throw ElementLongerThanReferenceError', () => {
            expect(() => {
                divisionCalc.getDivision(data, referenceLength);
            }).to.throw(ElementLongerThanReferenceError);
        });
    });
});
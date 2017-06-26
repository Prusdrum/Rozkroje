const expect = require('chai').expect; 
const divisionCalc = require('../../service/division');

describe('given find pattern', () => {
    describe('when data has one big element and other small', () => {
        let data;
        let referenceLength;

        beforeEach(() => {
            referenceLength = 12000;

            data = [
                { length: 1250, count: 4 },
                { length: 11500, count: 5 },
                { length: 260, count: 5 },
                { length: 2000, count: 5 }
            ];
        });

        it('should contain one big and one small element', () => {
            const result = divisionCalc.findPattern(data, referenceLength);

            expect(result.pattern).to.deep.equal([11500, 260]);
        });

        it('return pattern count as minimum count of pattern elements', () => {
            const result = divisionCalc.findPattern(data, referenceLength);

            expect(result.count).to.equal(5);
        });
    });

    describe('when data is not sorted', () => {
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

        it('return sorted data', () => {
            const result = divisionCalc.findPattern(data, referenceLength);

            expect(result.pattern).to.deep.equal([3500, 3500, 3500, 1250]);
        });

        it('return pattern count as minimum count of pattern elements', () => {
            const result = divisionCalc.findPattern(data, referenceLength);

            expect(result.count).to.equal(4);
        });
    });
});

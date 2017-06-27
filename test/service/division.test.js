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

            expect(result.elements).to.deep.equal([11500, 260]);
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
                { length: 3500, count: 7 },
                { length: 2700, count: 5 },
                { length: 2000, count: 5 }
            ];
        });

        it('return sorted data', () => {
            const result = divisionCalc.findPattern(data, referenceLength);

            expect(result.elements).to.deep.equal([3500, 3500, 3500, 1250]);
        });

        it('return pattern count as minimum count of pattern elements incuding repetition', () => {
            const result = divisionCalc.findPattern(data, referenceLength);

            expect(result.count).to.equal(2);
        });
    });

    describe('when data allows to have 1 pattern instance only', () => {
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

        it('return correct pattern', () => {
            const result = divisionCalc.findPattern(data, referenceLength);

            expect(result.elements).to.deep.equal([3500, 3500, 3500, 1250]);
        });

        it('return pattern count as minimum count of pattern elements incuding repetition', () => {
            const result = divisionCalc.findPattern(data, referenceLength);

            expect(result.count).to.equal(1);
        });
    });

    describe('when there is too few elements to fit pattern', () => {
let data;
        let referenceLength;

        beforeEach(() => {
            referenceLength = 12000;

            data = [
                { length: 1250, count: 4 },
                { length: 3500, count: 1 },
                { length: 2700, count: 5 },
                { length: 2000, count: 5 }
            ];
        });

        it('return correct pattern', () => {
            const result = divisionCalc.findPattern(data, referenceLength);

            expect(result.elements).to.deep.equal([3500, 2700, 2700, 2700]);
        });

        it('return pattern count as minimum count of pattern elements incuding repetition', () => {
            const result = divisionCalc.findPattern(data, referenceLength);

            expect(result.count).to.equal(1);
        });
    });
});

describe('given reduce by pattern', () => {
    describe('when count after is more than 0', () => {
        let data;
        let pattern;

        beforeEach(() => {
            pattern = {
                elements: [3500, 3500, 1250],
                count: 1
            }

            data = [
                { length: 1250, count: 4 },
                { length: 3500, count: 5 },
                { length: 2700, count: 5 },
                { length: 2000, count: 5 }
            ];
        });
        
        it('it should remove elements', () => {
            const result = divisionCalc.reduceByPattern(data, pattern);

            expect(result).to.deep.equal([
                { length: 1250, count: 3 },
                { length: 3500, count: 3 },
                { length: 2700, count: 5 },
                { length: 2000, count: 5 }
            ])
        });
    });    
});

describe('given has any elements', () => {
    describe('when there is at least one element', () => {
        let data;

        beforeEach(() => {
            data = [
                { length: 1250, count: 4 },
                { length: 3500, count: 5 },
                { length: 2700, count: 5 },
                { length: 2000, count: 5 }
            ];
        });
        
        it('should return true', () => {
            const result = divisionCalc.hasAnyElements(data);

            expect(result).to.be.true;
        });
    });

    describe('when every element has count equals 0', () => {
        let data;

        beforeEach(() => {
            data = [
                { length: 1250, count: 0 },
                { length: 3500, count: 0 },
                { length: 2700, count: 0 },
                { length: 2000, count: 0 }
            ];
        });
        
        it('should return false', () => {
            const result = divisionCalc.hasAnyElements(data);

            expect(result).to.not.be.true;
        });
    });
});

describe('given get division', () => {
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
            const result = divisionCalc.getDivision(data, referenceLength);

            const expcted = [
                { elements: [3500, 3500, 3500, 1250], count: 1 },
                { elements: [3500, 3500, 2700, 2000], count: 1 },
                { elements: [2700, 2700, 2700, 2700], count: 1 },
                { elements: [2000, 2000, 2000, 2000, 1250, 1250, 1250], count: 1 }
            ];

            expect(result).to.deep.equal(expcted);
        });
    });
});
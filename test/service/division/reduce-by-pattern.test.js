const expect = require('chai').expect; 
const reduceByPattern = require('../../../service/division/reduce-by-pattern');

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
            const result = reduceByPattern(data, pattern);

            expect(result).to.deep.equal([
                { length: 1250, count: 3 },
                { length: 3500, count: 3 },
                { length: 2700, count: 5 },
                { length: 2000, count: 5 }
            ])
        });
    });    
});
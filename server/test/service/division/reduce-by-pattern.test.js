const expect = require('chai').expect; 
const reduceByPattern = require('../../../service/division/reduce-by-pattern');

describe('given reduce by pattern', () => {
    describe('when count after is more than 0', () => {

        const testCases = [
            //#0
            {
                data : [
                    { length: 1250, count: 4 },
                    { length: 3500, count: 5 },
                    { length: 2700, count: 5 },
                    { length: 2000, count: 5 }
                ],
                pattern: {
                    elements: [3500, 3500, 1250],
                    count: 1
                },
                expected: [
                    { length: 1250, count: 3 },
                    { length: 3500, count: 3 },
                    { length: 2700, count: 5 },
                    { length: 2000, count: 5 }
                ]
            }
        ];

        testCases.forEach((testCase, index) => {
            it(`should reduce by pattern for test case: ${index}`, () => {
                const actual = reduceByPattern(testCase.data, testCase.pattern);

                expect(actual).to.deep.equal(testCase.expected);
            });
        });
    });    
});
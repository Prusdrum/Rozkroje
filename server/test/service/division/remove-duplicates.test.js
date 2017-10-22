const expect = require('chai').expect; 
const removeDuplicates = require('../../../service/division/remove-duplicates');

describe('given removeDuplicates', () => {
    describe('when called with duplicate elements', () => {
        const testCases = [
            //#0
            {
                data : [
                    { length: 2500, count: 2},
                    { length: 101, count: 3},
                    { length: 2500, count: 5}
                ],
                expected: [
                    { length: 2500, count: 7},
                    { length: 101, count: 3}
                ]
            },
            //#1
            {
                data: [
                    { length: 100, count: 1 },
                    { length: 100, count: 1 },
                    { length: 100, count: 1 }
                ],
                expected: [
                    { length: 100, count: 3 }
                ]
            },
            //#2
            {
                data: [],
                expected: []
            }
        ];

        testCases.forEach((testCase, index) => {
            it(`should reduce elements for test case ${index}`, () => {
                const actual = removeDuplicates(testCase.data);
                
                expect(actual).to.deep.equal(testCase.expected);
            });
        });
    })
});
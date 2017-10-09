const expect = require('chai').expect; 
const removeDuplicates = require('../../../service/division/remove-duplicates');

describe('given removeDuplicates', () => {
    describe('when called with duplicate elements', () => {
        let data;

        beforeEach(() => {
            data = [
                { length: 2500, count: 2},
                { length: 101, count: 3},
                { length: 2500, count: 5}
            ]
        });

        it('should reduce second element to first', () => {
            const expected = [
                { length: 2500, count: 7},
                { length: 101, count: 3}
            ];

            expect(removeDuplicates(data)).to.deep.equal(expected);
        });
    })
});
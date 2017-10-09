const expect = require('chai').expect; 
const hasAnyElements = require('../../../service/division/has-any-elements');

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
            const result = hasAnyElements(data);

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
            const result = hasAnyElements(data);

            expect(result).to.not.be.true;
        });
    });
});

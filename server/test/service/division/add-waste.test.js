const expect = require('chai').expect;
const addWaste = require('../../../service/division/add-waste');

describe('given add waste', () => {
    describe('when called with elements and ref length', () => {
        let pattern;
        const referenceLength = 12000;

        beforeEach(() => {
            pattern = {
                elements: [2500, 2500, 2500, 2500, 1000],
                count: 20
            }
        });

        it('should return model with new property waste', () => {
            expect(addWaste(pattern, referenceLength)).to.deep.equal({
                elements: pattern.elements,
                count: pattern.count,
                waste: 1000
            });
        });
    })
});
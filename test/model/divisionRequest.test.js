const expect = require('chai').expect; 
const divisionRequetsModel = require('../../model/divisionRequest');

describe('given division requets model', () => {
    describe('when data has incorrect model', () => {
        let badModel;

        beforeEach(() => {
            badModel =  [
                { length : 2000 }
            ]
        });


        it('should throw type error', () => {
            expect(() => {
                return divisionRequetsModel(badModel);
            }).to.throw('NO_COUNT_SPECIFIED');
        });
    });

    describe('when data has correct model', () => {
        let goodModel;

        beforeEach(() => {
            goodModel = [
                { length : 2000, count : 2 }
            ]
        });

        it('should NOT throw type error', () => {
            expect(() => {
                divisionRequetsModel(goodModel);
            }).to.not.throw();
        });
    });

    
});
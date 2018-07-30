const expect = require('chai').expect;

const plateCutter = require('../../../service/plate-cutter/plate-cutter');

describe('putHorizontally', () => {
  it('should return the same plate if it already is horizontally', () => {
    const plate = { 
      width: 1260, 
      height: 600 ,
      id: 'should stay the same'
    };

    expect(plateCutter.putHorizontally(plate)).to.deep.equal(plate);
  });

  it('should return inverted plate if it is not horizontally', () => {
    const plate = { 
      id: 'should stay the same',
      width: 600, 
      height: 1260
    };

    expect(plateCutter.putHorizontally(plate)).to.deep.equal({
      width: 1260, height: 600,
      id: 'should stay the same'
    });
  });
});
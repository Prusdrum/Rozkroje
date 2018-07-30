const expect = require('chai').expect;

const plateCutter = require('../../../service/plate-cutter/plate-cutter');

describe('plate cutter', () => {
  describe('putHorizontally', () => {
    it('should return the same plate if it already is horizontally', () => {
      const plate = {
        width: 1260,
        height: 600,
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

  describe('hasAnyElement', () => {
    it('should return true when there is at least one element', () => {
      const elements = [
        { count: 5 }
      ];

      expect(plateCutter.hasAnyElement(elements)).to.equal(true);
    });

    it('should return false when count is 0 for every element', () => {
      const elements = [
        { count: 0 },
        { count: 0 }
      ];

      expect(plateCutter.hasAnyElement(elements)).to.equal(false);
    });


    it('should return false for empty array', () => {
      const elements = [];

      expect(plateCutter.hasAnyElement(elements)).to.equal(false);
    });
  });

  describe('doesItFitBelow', () => {
    const plate = { 
      width: 1200, height: 600,
      elements: [
        { top: 0, left: 0, width: 1000, height: 300 }
      ]
    };

    //TODO - check for more elements in elements' list

    it('should return true if element fits', () => {
      const elementToFit = { width: 1000, height: 250 };
      const result = plateCutter.doesItFitBelow(plate, elementToFit);
      expect(result).to.equal(true);
    });

    it('should return false if element doesnt fit', () => {
      const elementToFit = { width: 1000, height: 350 };
      const result = plateCutter.doesItFitBelow(plate, elementToFit);
      expect(result).to.equal(false);
    });
  });

  describe('sort elements', () => {
    it('should sort by area desc', () => {
      const before = [
        { width: 150, height: 50 }, //7 500
        { width: 100, height: 100 }, //10 000
        { width: 150, height: 75 } //11 250
      ];

      const after = [
        { width: 150, height: 75 }, //11 250
        { width: 100, height: 100 }, //10 000
        { width: 150, height: 50 }, //7 500
      ];

      expect(plateCutter.sortElements(before)).to.deep.equal(after);
    });
  })
});
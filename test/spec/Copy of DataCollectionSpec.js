/**
 * @author Jerry
 */
define(['data-collection'], function(DataCollection){
	describe('Data Collection', function(){
		var MOCKS = {
			ONE_ELEMENT: [{len: 500, count: 1}],
			ONE_ELEMENTS: [{len: 100, count: 17}],
			THREE_ELEMENTS: [{len: 250, count: 2}, {len: 450, count: 4}, {len: 1700, count: 7}]
		};
		/*--------------------------------------------------------------------------*/
		var DC01, C1, DC3;
		beforeEach(function(){
			DC01 = new DataCollection(MOCKS.ONE_ELEMENT);
			DC1 = new DataCollection(MOCKS.ONE_ELEMENTS);
			DC3 = new DataCollection(MOCKS.THREE_ELEMENTS);
		});
		/*--------------------------------------------------------------------------*/
		
		it('should return correct value when asked for total count', function(){
			expect(DC01.getElementsCount()).toEqual(1);
			expect(DC1.getElementsCount()).toEqual(17);
			expect(DC3.getElementsCount()).toEqual(13);
		});
		it('should return correct value when asked for longest element\'s length', function(){
			expect(DC01.getLongestElementLength()).toEqual(500);
			expect(DC1.getLongestElementLength()).toEqual(100);
			expect(DC3.getLongestElementLength()).toEqual(1700);
		});
		it('should return correct value when asked for another length', function(){
			expect(DC01.hasAnotherLength()).toBe(false);
			expect(DC1.hasAnotherLength()).toBe(false);
			expect(DC3.hasAnotherLength()).toBe(true);
		});
		it('should return false when there is not next element', function(){
			var hasNextElement = DC01.hasNextElement();
			expect(hasNextElement).toBe(false);
		});
		it('should return true when there is next element', function(){
			var hasNextElement = DC1.hasNextElement();
			expect(hasNextElement).toBe(true);
		});
		it('should has longest element as current at start', function(){
			expect(DC01.getCurrentElementLength()).toEqual(500);
			expect(DC1.getCurrentElementLength()).toEqual(100);
			expect(DC3.getCurrentElementLength()).toEqual(1700);
		});
		it('should point to next length when there is next length', function(){
			DC3.pointToNextLength();
			expect(DC3.getCurrentElementLength()).toEqual(450);
			DC3.pointToNextLength();
			expect(DC3.getCurrentElementLength()).toEqual(250);
		});
		it('should point to same length when there is no next length', function(){
			expect(DC1.getCurrentElementLength()).toEqual(100);
			DC1.pointToNextLength();
			expect(DC1.getCurrentElementLength()).toEqual(100);
		});
		it('should reduce total count when current element taken', function(){
			expect(DC3.getElementsCount()).toEqual(13);
			DC3.takeCurrentElement();
			DC3.takeCurrentElement();
			expect(DC3.getElementsCount()).toEqual(11);
		});
		it('should reduce count for each element taken', function(){
			expect(DC3.getCurrentElementCount()).toEqual(7);
			DC3.takeCurrentElement();
			DC3.takeCurrentElement();
			expect(DC3.getCurrentElementCount()).toEqual(5);
		});
		it('should return correct count when pointer moved to next element', function(){
			expect(DC3.getCurrentElementCount()).toEqual(7);
			DC3.pointToNextLength();
			expect(DC3.getCurrentElementCount()).toEqual(4);
		});
		it('should point to next length when all element with old length are taken', function(){
			expect(DC3.getCurrentElementCount()).toEqual(7);
			expect(DC3.getCurrentElementLength()).toEqual(1700);
			
			DC3.takeCurrentElement();
			DC3.takeCurrentElement();
			DC3.takeCurrentElement();
			DC3.takeCurrentElement();
			DC3.takeCurrentElement();
			DC3.takeCurrentElement();
			
			expect(DC3.getCurrentElementCount()).toEqual(1);
			expect(DC3.getCurrentElementLength()).toEqual(1700);
			
			expect(DC3.takeCurrentElement()).toEqual(1700);
			
			expect(DC3.getCurrentElementCount()).toEqual(0);
			
			expect(DC3.takeCurrentElement()).toBe(null);
			expect(DC3.getCurrentElementCount()).toEqual(0);
			expect(DC3.getCurrentElementLength()).toEqual(1700);
			expect(DC3.getCurrentElementCount()).not.toEqual(-1);
		});
		
		it('should return longest element with count more than zero', function(){
			expect(DC3.getCurrentElementCount()).toEqual(7);
			expect(DC3.getLongestElementLength()).toEqual(1700);
			
			DC3.takeCurrentElement();
			DC3.takeCurrentElement();
			DC3.takeCurrentElement();
			DC3.takeCurrentElement();
			DC3.takeCurrentElement();
			DC3.takeCurrentElement();
			
			expect(DC3.getCurrentElementCount()).toEqual(1);
			expect(DC3.getLongestElementLength()).toEqual(1700);
			
			expect(DC3.takeCurrentElement()).toEqual(1700);
			
			expect(DC3.getCurrentElementCount()).toEqual(0);
			
			expect(DC3.takeCurrentElement()).toBe(null);
			expect(DC3.getCurrentElementCount()).toEqual(0);
			expect(DC3.getLongestElementLength()).toEqual(450);
			expect(DC3.getCurrentElementLength()).toEqual(1700);
			expect(DC3.getCurrentElementCount()).not.toEqual(-1);
		});
	});
});

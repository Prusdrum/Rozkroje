/**
 * @author Jerry
 */
define(
['data-collection', 'joint-algorithm', 'no-joint-algorithm'], 
function(DataCollection, JointAlgo, NoJointAlgo){
	xdescribe('No Joint Algorithm', function(){
		var CONST = {
				refLen: 12000
			},
			MOCKS = {
				VERY_LONG_ELEMENT: [{len: 250, count: 2}, {len: 12500, count: 1}, {len: 1700, count: 7}],
				SHORT_ELEMENTS: [{len: 250, count: 2}, {len: 450, count: 4}, {len: 1700, count: 7}],
				ONE_PART_ELEMENTS: [{len: 250, count: 3}, {len: 450, count: 4}]
			},
			DC_LongElement, DC_ShortElements, DC_OnePartElements;
			
		/*--------------------------------------------------------------------------*/	
		beforeEach(function(){
			DC_LongElement = new DataCollection(MOCKS.VERY_LONG_ELEMENT);
			DC_ShortElements = new DataCollection(MOCKS.SHORT_ELEMENTS);
			DC_OnePartElements = new DataCollection(MOCKS.ONE_PART_ELEMENTS);
		});	
		/*--------------------------------------------------------------------------*/
		
		
		it ("should throw error when one element is longer than reference element", function(){
			var algorithmToLong = new NoJointAlgo(DC_LongElement, CONST.refLen);
			expect(algorithmToLong.getResult).toThrowError("Jeden z elementów jest dłuższy niż długość lagi. Rozważ stykowanie.");
		});
		it ("should not throw error when no element is longer than reference element", function(){
			var algorithmGood = new NoJointAlgo(DC_ShortElements, CONST.refLen);
			expect(algorithmGood.getResult).not.toThrowError();
		});
		xit ("should return correct result data for elements with total length less than reference length", function(){
			var algorithm = new NoJointAlgo(DC_OnePartElements, CONST.refLen),
				exceptArray = [[450, 450, 450, 450, 250, 250, 250]];
				
			expect(algorithm.getResult()).toEqual(exceptArray);
		});
		
	});
});

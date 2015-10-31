/**
 * @author Jerry
 */
define(
['data-collection', 'joint-algorithm', 'no-joint-algorithm'], 
function(DataCollection, JointAlgo, NoJointAlgo){
	describe('No Joint Algorithm', function(){
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
		describe('checkIfCanCalculate', function(){
			it('Jeżeli najdłuższy element jest dłuższy niż długość lagi zrzuć wyjątek', function(){
				var badAlgo = new NoJointAlgo(DC_LongElement, CONST.refLen);
				
				expect(badAlgo.checkIfCanCalculate()).toBe(false);
				expect(badAlgo.getResult).toThrowError();
			});
			it('Jeżeli najdłuższy element nie jest dłuższy niż długość lagi nie zrzucaj wyjątku', function(){
				var goodAlgo = new NoJointAlgo(DC_ShortElements, CONST.refLen);
				
				expect(goodAlgo.checkIfCanCalculate()).toBe(true);
				expect(goodAlgo.getResult).not.toThrowError();
			});
		});
		
	});
});

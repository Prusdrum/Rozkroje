/**
 * @author Jerry
 */
define(
['data-collection', 'joint-algorithm', 'no-joint-algorithm', 'result-data'], 
function(DataCollection, JointAlgo, NoJointAlgo, ResultData){
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
		
		describe('willFit', function(){
			var result;
			
			beforeEach(function(){
				result = new ResultData();
			});
			
			it('Powinien zwrócić true jeżeli wejdzie jeszcze jeden element', function(){
				var algo = new NoJointAlgo(DC_ShortElements, CONST.refLen);
				
				result.add(1000);
				expect(algo.willFit(result, 1000)).toBe(true);
			});
			
			it('Powinien zwrócić false jeżeli nie wejdzie jeszcze jeden element', function(){
				var algo = new NoJointAlgo(DC_ShortElements, CONST.refLen);
				
				result.add(11500);
				expect(algo.willFit(result, 1000)).toBe(false);
			});
		});
		
		describe('getResult', function(){
			it('Powinno podzielic', function(){
				var algo = new NoJointAlgo(DC_ShortElements, CONST.refLen);
				var result = algo.getResult();
				
				expect(result[0].elements).toEqual([1700, 1700, 1700, 1700, 1700, 1700, 1700]);
				expect(result[1].elements).toEqual([450, 450, 450, 450, 250, 250]);
				expect(result.length).toEqual(2);
			});
		});
	});
});

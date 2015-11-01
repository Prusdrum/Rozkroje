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
				ONE_PART_ELEMENTS: [{len: 250, count: 3}, {len: 450, count: 4}],
				CLOSE_TO_END: [{len: 11500, count: 3}, {len: 500, count: 6}],
				OVER_THE_END: [{len: 11500, count: 3}, {len: 501, count: 6}]
			},
			DC_LongElement, DC_ShortElements, DC_OnePartElements, DC_Close, DC_Over;
			
		/*--------------------------------------------------------------------------*/	
		beforeEach(function(){
			DC_LongElement = new DataCollection(MOCKS.VERY_LONG_ELEMENT);
			DC_ShortElements = new DataCollection(MOCKS.SHORT_ELEMENTS);
			DC_OnePartElements = new DataCollection(MOCKS.ONE_PART_ELEMENTS);
			DC_Close = new DataCollection(MOCKS.CLOSE_TO_END);
			DC_Over = new DataCollection(MOCKS.OVER_THE_END);
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
			it('Prosty podział', function(){
				var algo = new NoJointAlgo(DC_ShortElements, CONST.refLen),
					result = algo.getResult();
				
				expect(result[0].elements).toEqual([1700, 1700, 1700, 1700, 1700, 1700, 1700]);
				expect(result[1].elements).toEqual([450, 450, 450, 450, 250, 250]);
				expect(result.length).toEqual(2);
			});
			it('Jeden dlugi, drugi krotki', function(){
				var algo = new NoJointAlgo(DC_Close, CONST.refLen),
					result = algo.getResult();
				
				expect(result.length).toEqual(4);
				expect(result[0].elements).toEqual([11500, 500]);
				expect(result[1].elements).toEqual([11500, 500]);
				expect(result[2].elements).toEqual([11500, 500]);
				expect(result[3].elements).toEqual([500, 500, 500]);
			});
			it('Jeden dlugi, drugi krotki, ale troszke za dlugi', function(){
				var algo = new NoJointAlgo(DC_Over, CONST.refLen),
					result = algo.getResult();

				expect(result.length).toEqual(4);
				expect(result[0].elements).toEqual([11500]);
				expect(result[1].elements).toEqual([501, 501, 501, 501, 501, 501]);
				expect(result[2].elements).toEqual([11500]);
				expect(result[3].elements).toEqual([11500]);
			});
		});
	});
});

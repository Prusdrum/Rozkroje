/**
 * @author Jerry
 */
define(['data-collection'], function(DataCollection){
	describe('Data Collection', function(){
		var MOCKS = {
			NO_ELEMENTS: [{len: 400, count: 0}],
			ONE_ELEMENT: [{len: 500, count: 1}],
			ONE_ELEMENTS: [{len: 100, count: 17}],
			THREE_ELEMENTS: [{len: 250, count: 2}, {len: 450, count: 4}, {len: 1700, count: 7}],
			LACK_ELEMENTS: [{len: 250, count: 0}, {len: 450, count: 0}, {len: 1700, count: 7}],
			LACK_MIDDLE_ELEMENTS: [{len: 250, count: 2}, {len: 450, count: 0}, {len: 1700, count: 7}]
		};
		/*--------------------------------------------------------------------------*/
		var DC01, C1, DC3;
		beforeEach(function(){
			DCnone = new DataCollection(MOCKS.NO_ELEMENTS);
			DC01 = new DataCollection(MOCKS.ONE_ELEMENT);
			DC1 = new DataCollection(MOCKS.ONE_ELEMENTS);
			DC3 = new DataCollection(MOCKS.THREE_ELEMENTS);
			DC0 = new DataCollection(MOCKS.LACK_ELEMENTS);
			DC0plus = new DataCollection(MOCKS.LACK_MIDDLE_ELEMENTS);
		});
		/*--------------------------------------------------------------------------*/
		
		it('getElementsCount powinien zwrócić sumę elementów', function(){
			expect(DC01.getElementsCount()).toEqual(1);
			expect(DC1.getElementsCount()).toEqual(17);
			expect(DC3.getElementsCount()).toEqual(13);
		});
		
		it('getLength powinien zwrócić długość aktywnego elementu', function(){
			expect(DC3.getLength()).toEqual(1700);
		});
		
		it('getCount powinien zwrócić ilość elementów aktywnego elementu', function(){
			expect(DC3.getCount()).toEqual(7);
		});

		it('hasAny powinien zwrócić false gdy totalCount = 0', function(){
			expect(DCnone.hasAny()).toBe(false);
			expect(DC01.hasAny()).toBe(true);
		});
		
		it('hasNext powinien zwrocić true jeżeli aktywny element nie jest ostatnim w danej długości', function(){
			expect(DC3.hasNext()).toBe(true);
			expect(DCnone.hasNext()).toBe(false);
			expect(DC01.hasNext()).toBe(false);
		});
		
		it('hasNextLength powinien zwrócić true gdy jest następna długość', function(){
			expect(DC3.hasNextLength()).toBe(true);
			expect(DC0plus.hasNextLength()).toBe(true);
			
			expect(DC1.hasNextLength()).toBe(false);
			expect(DC01.hasNextLength()).toBe(false);
			expect(DC0.hasNextLength()).toBe(false);
		});
		describe('nextLength', function(){
			it('powinno ustawić się na następną długość gdzie count > 0. ' + 
			'Jeżeli nie ma następnej długości nextLength zrzuci wyjątek', function(){
				DC3.nextLength();
				expect(DC3.getLength()).toEqual(450);
				
				DC0plus.nextLength();
				expect(DC0plus.getLength()).toEqual(250);
				
				expect(DCnone.nextLength).toThrowError();
				expect(DC0.nextLength).toThrowError();
			});	
		});
		
		describe('next', function(){
			it('powinien nawigować do następnego elementu w danej długości i zrzucić wyjątek jeżeli to był ostatni', function(){
				DC3.nextLength();
				expect(DC3.getLength()).toEqual(450);
				expect(DC3.getCount()).toEqual(4);
				expect(DC3.next).not.toThrowError();
				expect(DC3.next).not.toThrowError();
				expect(DC3.next).not.toThrowError();
				expect(DC3.next).toThrowError();
				
				DC0plus.nextLength();
				expect(DC0plus.next).not.toThrowError();
				expect(DC0plus.next).toThrowError();
				
				expect(DCnone.next).toThrowError();
				expect(DC01.next).toThrowError();
			});			
		});

		describe('getLongestLength', function(){
			it('powinno zwrócić najdłuższy element lub null jeśli brak', function(){
				expect(DC3.getLongestLength()).toEqual(1700);
				expect(DCnone.getLongestLength()).toEqual(null);
			});	
		});
		
		describe('take', function(){
			it('powinno zmniejszyć jeden element lub zwrócić null jeśli brak następnego', function(){
				expect(DC0plus.take()).toEqual(1700);
				expect(DC0plus.getCount()).toEqual(6);
				expect(DC0plus.take()).toEqual(1700);
				expect(DC0plus.getCount()).toEqual(5);
				expect(DC0plus.take()).toEqual(1700);
				expect(DC0plus.getCount()).toEqual(4);
				expect(DC0plus.take()).toEqual(1700);
				expect(DC0plus.getCount()).toEqual(3);
				expect(DC0plus.take()).toEqual(1700);
				expect(DC0plus.getCount()).toEqual(2);
				expect(DC0plus.take()).toEqual(1700);
				expect(DC0plus.getCount()).toEqual(1);
				expect(DC0plus.take()).toEqual(1700);
				expect(DC0plus.getCount()).toEqual(0);
				expect(DC0plus.take()).toEqual(null);
				expect(DC0plus.take()).toEqual(null);
				expect(DC0plus.getCount()).toEqual(0);
			});	
			it('Calkowita ilosc elementow powinna malec razem z zabieraniem elementow', function(){
				expect(DC0plus.getElementsCount()).toEqual(9);
				expect(DC0plus.take()).toEqual(1700);
				expect(DC0plus.getCount()).toEqual(6);
				expect(DC0plus.take()).toEqual(1700);
				expect(DC0plus.take()).toEqual(1700);
				expect(DC0plus.take()).toEqual(1700);
				expect(DC0plus.take()).toEqual(1700);
				expect(DC0plus.take()).toEqual(1700);
				expect(DC0plus.take()).toEqual(1700);
				expect(DC0plus.getCount()).toEqual(0);
				expect(DC0plus.getElementsCount()).toEqual(2);
			});
		});
		
		describe('toLongest', function(){
			it('powinno nawigować do najdłuższego elementu jeżeli ma elementy', function(){
				expect(DC0plus.getLength()).toEqual(1700);
				expect(DC0plus.take()).toEqual(1700);
				expect(DC0plus.take()).toEqual(1700);
				expect(DC0plus.take()).toEqual(1700);
				expect(DC0plus.take()).toEqual(1700);
				expect(DC0plus.take()).toEqual(1700);
				expect(DC0plus.take()).toEqual(1700);
				expect(DC0plus.take()).toEqual(1700);
				DC0plus.toLongest();
				expect(DC0plus.take()).toEqual(250);
				expect(DC0plus.take()).toEqual(250);
				expect(DC0plus.getElementsCount()).toEqual(0);
				expect(DC0plus.toLongest).toThrowError();
			});
		});
	});
});

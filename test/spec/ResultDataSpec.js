/**
 * @author Jerry
 */
define(['result-data'], function(ResultData){
	describe('Result Data', function(){
		var part_one, part_two;
		
		beforeEach(function(){
			part_one = new ResultData(),
			part_two = new ResultData();
		});
		
		describe('Index', function(){
			it('powinien być statyczny i zwiekszac sie przy kazdej nowej instacji', function(){
				expect(part_one.index).toEqual(0);
				expect(part_two.index).toEqual(1);
			});
		});
		describe('Add', function(){
			it('Dodanie elementow powinno dodac sie tylko w jednej instancji', function(){
				part_one.add(450);
				
				part_two.add(400);
				part_two.add(400);
				
				expect(part_one.elements.length).toEqual(1);
				expect(part_two.elements.length).toEqual(2);
			});
			
			it('Dodanie czegoś innego niż liczba powinno zrzucić wyjątek', function(){
				expect(function(){
					part_one.add("450");
				}).not.toThrowError();
				
				expect(function(){
					part_one.add("aaa");
				}).toThrowError();
			});
		});
		
		describe('AddMore', function(){
			it('Powinno dodać od razu wiele elementów', function(){
				part_one.addMore([400]);
				part_two.addMore([400, 400]);
				
				expect(part_one.elements.length).toEqual(1);
				expect(part_two.elements.length).toEqual(2);
			});
		});
		
		describe('Get sum', function(){
			it('Powinno zwrócić sumę wszystkich elementów', function(){
				part_one.addMore([400, 400, 400]);
				part_one.add(400);
				
				expect(part_one.getSum()).toEqual(1600);
			});
		});
	});
});

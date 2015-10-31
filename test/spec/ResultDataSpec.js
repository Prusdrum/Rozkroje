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
		describe('Elements', function(){
			it('Dodanie elementow powinno dodac sie tylko w jednej instancji', function(){
				part_one.addElement(450);
				
				part_two.addElement(400);
				part_two.addElement(400);
				
				expect(part_one.elements.length).toEqual(1);
				expect(part_two.elements.length).toEqual(2);
			});
		});
		
		describe('Add Elements', function(){
			it('Powinno dodać od razu wiele elementów', function(){
				part_one.addElements([400]);
				part_two.addElements([400, 400]);
				
				expect(part_one.elements.length).toEqual(1);
				expect(part_two.elements.length).toEqual(2);
			});
		});
		
	});
});

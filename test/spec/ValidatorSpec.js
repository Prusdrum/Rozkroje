/**
 * @author Jerry
 */
define(['data-validator'], function(Valid){
	describe('Validator', function(){
		var CONST = {
			INDEX_ONE: 1
		};

		it('should ignore row when both arguments are null [null, null]', function(){
			var validator = function(){
				Valid.validRow([null, null], CONST.INDEX_ONE);
			};
			expect(validator).not.toThrowError();
		});
		it('should throw an error when second argument is null [2, null]', function(){
			var validator = function(){
				Valid.validRow([2, null], CONST.INDEX_ONE);
			};
			expect(validator).toThrowError("W wierszu numer "+ (CONST.INDEX_ONE + 1) +" brak jednej z wartości");
		});
		it('should throw an error when first argument is null [null, 2]', function(){
			var validator = function(){
				Valid.validRow([null, 2], CONST.INDEX_ONE);
			};
			expect(validator).toThrowError("W wierszu numer "+ (CONST.INDEX_ONE + 1) +" brak jednej z wartości");
		});
		it('should throw an error when second argument is less than zero [2, -1]', function(){
			var validator = function(){
				Valid.validRow([2, -1], CONST.INDEX_ONE);
			};
			expect(validator).toThrowError("W wierszu numer "+ (CONST.INDEX_ONE + 1) +" jedna z wartości jest mniejsza lub równa zero");
		});
		it('should throw an error when first argument is less than zero [-2, 100]', function(){
			var validator = function(){
				Valid.validRow([-2, 100], CONST.INDEX_ONE);
			};
			expect(validator).toThrowError("W wierszu numer "+ (CONST.INDEX_ONE + 1) +" jedna z wartości jest mniejsza lub równa zero");
		});
		it('should throw an error when first argument is not a number ["a", "2"]', function(){
			var validator = function(){
				Valid.validRow(["a", "2"], CONST.INDEX_ONE);
			};
			expect(validator).toThrowError("W wierszu numer "+ (CONST.INDEX_ONE + 1) +" jedna z wartości nie jest liczbą");
		});
		it('should throw an error when second argument is not a number ["2", "a"]', function(){
			var validator = function(){
				Valid.validRow(["2", "a"], CONST.INDEX_ONE);
			};
			expect(validator).toThrowError("W wierszu numer "+ (CONST.INDEX_ONE + 1) +" jedna z wartości nie jest liczbą");
		});
		it('should not throw an error when second argument is not a number but it is parsable ["2", "23a"]', function(){
			var validator = function(){
				Valid.validRow(["2", "23a"], CONST.INDEX_ONE);
			};
			expect(validator).not.toThrowError();
		});
		it('should not throw an error when [2, 2] passed', function(){
			var validator = function(){
				Valid.validRow([2, 2], CONST.INDEX_ONE);
			};
			expect(validator).not.toThrowError();
		});
		it('should not throw an error when ["2", 2] passed', function(){
			var validator = function(){
				Valid.validRow(["2", 2], CONST.INDEX_ONE);
			};
			expect(validator).not.toThrowError();
		});
	});
});

/**
 * @author Jerry
 */
define(function(){
	var index = 0,
		NO_NUMBER_ERROR_MSG = "Przekazana wartość nie jest liczbą",
		ResultData = function(){
			this.index = index;
			this.elements = [];
			this.sum = 0;
			index += 1; //static
		};
	
	ResultData.prototype.add = function(el){
		var numEl = parseInt(el, 10);
		if (!isNaN(numEl)){
			this.elements.push(numEl);
			this.elements.sort(function(a, b){
				return b - a;
			});
			this.sum += numEl;
		} else {
			throw new Error(NO_NUMBER_ERROR_MSG);
		}
	};
	
	ResultData.prototype.getCopy = function(){
		var copy = {};
		
		$.extend(true, copy, this);
		return copy;
	};
	
	ResultData.prototype.addMore = function(els){
		for (var i = 0, l = els.length; i < l; i++){
			this.add(els[i]);
		}
	};
	
	ResultData.prototype.getSum = function(){
		var sum = 0;
		
		this.elements.forEach(function(el){
			sum += el;
		});
		return sum;
	};
	
	return ResultData;
});

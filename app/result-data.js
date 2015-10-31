/**
 * @author Jerry
 */
define(function(){
	var index = 0;
	
	var ResultData = function(){
		this.index = index;
		this.elements = [];
		
		index += 1; //static
	};
	
	ResultData.prototype.addElement = function(el){
		this.elements.push(el);
	};
	
	ResultData.prototype.addElements = function(els){
		for (var i = 0, l = els.length; i < l; i++){
			this.elements.push(els[i]);
		}
	};
	
	return ResultData;
});

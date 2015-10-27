/**
 * @author Jerry
 */
define(function(){
	var V = {};
	
	V.validRow = function(row, index){
		var len = row[0],
			count = row[1],
			result = false,
			lenIsEmpty = (len === null || len === ""),
			countIsEmpty = (count === null|| count === ""),
			lenIsNaN = (isNaN(parseInt(len, 10))),
			countIsNaN = (isNaN(parseInt(count, 10))),
			errorMsg,
			rowIsNotEmpty = (!lenIsEmpty && !countIsEmpty);
		
		if ((lenIsEmpty && !countIsEmpty) || (!lenIsEmpty && countIsEmpty)){
			errorMsg = _getNonValueErrorMessage(index);
			throw new Error(errorMsg);
		}
		if (rowIsNotEmpty && (lenIsNaN || countIsNaN)){
			errorMsg = _getParseErrorMessage(index);
			throw new Error(errorMsg);
		}
		if (rowIsNotEmpty && (!lenIsNaN && !countIsNaN)){
			var lenIsLessThanZero = (len <= 0),
				countIsLessThanZero = (count <= 0);
				
			if (lenIsLessThanZero || countIsLessThanZero) {
				errorMsg = _getLessThanZeroErrorMessage(index);
				throw new Error(errorMsg);
			} else {
				result = true;
			}
		}
		return result;
	};

	function _getNonValueErrorMessage(index) {
		 return _getErrorMessageBase(index) + "brak jednej z wartości";
	}
	
	function _getParseErrorMessage(index){
		return _getErrorMessageBase(index) + "jedna z wartości nie jest liczbą";	
	}
	
	function _getLessThanZeroErrorMessage(index){
		return _getErrorMessageBase(index) + "jedna z wartości jest mniejsza lub równa zero";	
	}
	
	function _getErrorMessageBase(index){
		return "W wierszu numer " + (index + 1) + " ";
	}
	
	return V;
});

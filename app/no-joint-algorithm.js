/**
 * @author Jerry
 */
define(function(resultData){
	return function(data, refLen){
		var resultData = [],
			LENGTH_ERROR_MSG = "Jeden z elementów jest dłuższy niż długość lagi. Rozważ stykowanie.",
			self = this;
		
		
		function getResult(){
			if (!checkIfCanCalculate()) throw new Error(LENGTH_ERROR_MSG);
			
			_prepareResultData();
			return resultData;
		}
		
		function checkIfCanCalculate(){
			if (data.getLongestLength() > refLen){
				return false;
			}
			return true;
		}
		
		function _prepareResultData () {
	  		var longestElement, 
	  			currentReferenceElement = [];
	  		
	  		// while(data.hasNextElement()){
	  			// longestElement = data.getLongestElementLength();
	  			// if (willFit(currentReferenceElement, longestElement)){
	  				// currentReferenceElement.push(data.takeCurrentElement());
	  			// } else {
	  				// currentReferenceElement.push(data.takeCurrentElement());
	  			// }
	  			// //data.takeCurrentElement();
	  			// console.log(currentReferenceElement);
	  		// }
	  		// resultData.push(currentReferenceElement);
		}
		
		function willFit(referenceElement, elementToFit){
			var sum = 0;
			
			for (var i = 0, l = referenceElement.length; i < l; i++){
				sum += referenceElement[i];
			}
			
			return (sum + elementToFit) <= refLen;
		}
		
		this.getResult = getResult;
		this.checkIfCanCalculate = checkIfCanCalculate;
	};
});

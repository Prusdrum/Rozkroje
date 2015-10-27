/**
 * @author Jerry
 */
define(function(){
	return function(data, refLen){
		var resultData = [],
			LENGTH_ERROR_MSG = "Jeden z elementów jest dłuższy niż długość lagi. Rozważ stykowanie.";
		
		this.getResult = function(){
			// if (data.getLongestElementLength() > refLen){
				// throw new Error(LENGTH_ERROR_MSG);
			// } else {
				// //_prepareResultData();
			// }
			// return resultData;
		};
		
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
		
		
	};
});

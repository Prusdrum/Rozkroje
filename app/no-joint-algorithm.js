/**
 * @author Jerry
 */
define(['result-data'], function(ResultData){
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
			var part = new ResultData(),//laga
				resultCollection = [],
				willFitCondition;

			while(true){
				if (data.hasAny()){
					data.toLongest();
					willFitCondition = willFit(part, data.getLength());
					if (willFitCondition){
						part.add(data.take());
					} else {
						do {
							if (data.hasNextLength()){
								data.nextLength();
								willFitCondition = willFit(part, data.getLength());
							} else {
								resultCollection.push(part.getCopy());
								part = new ResultData();
								break;
							}
						} while (!(willFitCondition));
						part.add(data.take());
					}
				} else {
					break;
				}
			}
			resultCollection.push(part.getCopy());
			resultData = resultCollection;
			console.log(resultCollection);
		}
		
		function willFit(referenceElement, elementToFit){
			if ((referenceElement.getSum() + elementToFit) <= refLen){
				return true;
			} else {
				return false;
			}
		}
		
		this.getResult = getResult;
		this.checkIfCanCalculate = checkIfCanCalculate;
		this.willFit = willFit;
		

	};
});

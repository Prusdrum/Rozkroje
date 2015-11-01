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
				currentLength;
			
			

			data.toLongest();
			var willFitCondition;
			
			var i = 0;
			while(true){
				if (data.hasAny()){
					console.log('data has any');
					data.toLongest();
					console.log('data to longest : ' + data.getLength());
					willFitCondition = willFit(part, data.getLength());
					if (willFitCondition){
						console.log('Jeszcze się zmieści. Dodaj taki element: ' + data.getLength());
						part.add(data.take());
						console.log(part);
					} else {
						console.log('Nie zmieści się.');
						do {
							if (data.hasNextLength()){
								data.nextLength();
								willFitCondition = willFit(part, data.getLength());
							} else {
								resultCollection.push(part.getCopy());
								part = new ResultData();
								break;
							}
							
							console.log('Nowe will fit condition: ' + willFitCondition);
						} while (!(willFitCondition));
						part.add(data.take());
					}
				} else {
					console.log('data has no more - break');
					break;
				}
			}
			console.log(resultCollection);
			resultCollection.push(part.getCopy());
			resultData = resultCollection;
			console.log('Poza petla while true');
			console.log(resultCollection);
		}
		
		function willFit(referenceElement, elementToFit){
			console.log('Po dodaniu elementu bedzie: ' + (referenceElement.getSum() + elementToFit));
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

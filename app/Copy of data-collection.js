/**
 * @author Jerry
 */
define("data-collection", function(){
	return function(array){
		var _mArray = initArray(array),
			_elementsCount = getElementsCount(),
			_currentElementIndex,
			_self = this;
		
		this.isNotEmpty = function(){
			return (_elementsCount > 0);
		};
		
		this.hasNextElement = function(){
			return (_elementsCount <= 1 ? false : true);
		};
		
		this.getElementsCount = function(){
			return _elementsCount;
		};
		
		this.getLongestElementLength = function(){
			var i = _mArray.length - 1;
			while (i >= 0) {
				if (_mArray[i].count > 0){
					return _mArray[i].len;
				}
				i -= 1;
			}
			return null;
		};
		
		this.getCurrentElementLength = function(){
			return _mArray[_currentElementIndex].len;
		};
		
		this.getCurrentElementCount = function(){
			return _mArray[_currentElementIndex].count;
		};

		this.hasAnotherLength = function(){
			return hasAnotherLength();
		};
		this.pointToNextLength = function () {
	  		pointToNextLength();
		};
		
		this.takeCurrentElement = function(){
			var currentElement = _mArray[_currentElementIndex],
				canTake = getElementsCount() > 0 && currentElement.count > 0,
				isTheLastOne = currentElement.count === 0,
				result = null;
	
			if (canTake){
				reduceElementsCount(currentElement);
				result = currentElement.len;
			}
			console.log(_mArray);
			return result;
		};
		
		function reduceElementsCount(currentElement){
			currentElement.count -= 1;
			_elementsCount -= 1;
		}
		
		function increaseElementsCount(currentElement){
			currentElement.count += 1;
			_elementsCount += 1;
		}
				
		function getElementsCount(){
			var i = 0, l = _mArray.length, count, sum = 0;
			for (i; i < l; i++){
				count = _mArray[i].count;
				sum += count;
			}
			return sum;
		}
		
		function initArray(array){
			var newArray = copyArray(array);
			
			newArray.sort(function(a, b){
				return a.len - b.len;
			});
			_currentElementIndex = (newArray.length - 1);
			
			return newArray;
		}
		
		function copyArray(oldArray){
			var newArray = [],
				i = 0, l = oldArray.length,
				obj;
			
			for (i; i < l; i++){
				obj = $.extend(true, {}, oldArray[i]);
				newArray.push(obj);
			}
			return newArray;
		}
		
		function pointToNextLength(){
			(hasAnotherLength() ? (_currentElementIndex -= 1) : (null));
		}
		
		function hasAnotherLength () {
	  		return (_currentElementIndex - 1 >= 0);
		}
		
		
	};
});
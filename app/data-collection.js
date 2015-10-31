/**
 * @author Jerry
 */
define("data-collection", function(){
	return function(array){
		var _mArray = initArray(array),
			_elementsCount = getElementsCount(),
			_currentElementIndex,
			_currentInLength,
			_self = this;
				
		function getElementsCount(){
			var i = 0, l = _mArray.length, count, sum = 0;
			for (i; i < l; i++){
				count = _mArray[i].count;
				sum += count;
			}
			return sum;
		}
		
		function updateIndex(index){
			_currentInLength = _mArray[index].count - 1;
			_currentElementIndex = index;
		}
		
		function initArray(array){
			var newArray = copyArray(array),
				currentCount;
			
			newArray.sort(function(a, b){
				return a.len - b.len;
			});
			_currentElementIndex = (newArray.length - 1);
			
			try {
				currentCount = newArray[_currentElementIndex].count;
				_currentInLength = currentCount - 1;
			} catch (err){
				console.log(err);
			}
			finally {
				console.log(newArray);
			}
			
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
		
		function getCurrentElementLength(){
			return _mArray[_currentElementIndex].len;
		}
		
		function getCurrentElementCount(){
			return _mArray[_currentElementIndex].count;
		}
		
		function hasNext(){
			var result = false;
			
			if (!hasAny()) return result;
			
			if (_currentInLength > 0){
				result = true;
			} 
			
			return result;			
		}
		
		function hasNextLength(){
			var result = false;
			if (_currentElementIndex > 0){
				var nextIndex = getNextLengthIndex();
				if (nextIndex !== -1){
					result = true;
					return result;
				}
			} else {
				result = false;
			}
			return result;
		}
		
		function getNextLengthIndex(){
			var result = -1;
			for (var i = _currentElementIndex - 1; i >= 0; i--){
				if (_mArray[i].count > 0){
					return i;
				}
			}
			return result;
		}
		
		function hasAny(){
			return (_elementsCount > 0) ? true : false;
		}
		
		function nextLength(){
			if (hasNextLength()){
				updateIndex(getNextLengthIndex());
			} else {
				throw new Error("No next Length");
			}
		}
		
		function next(){
			if (hasNext()){
				_currentInLength -= 1;
			} else {
				throw new Error("No next element");
			}
		}
		
		function getLongestLength(){
			var i = _mArray.length - 1;
			while (i >= 0) {
				if (_mArray[i].count > 0){
					return _mArray[i].len;
				}
				i -= 1;
			}
			return null;
		}
		
		function take(){
			if (_currentInLength >= 0){
				_currentInLength -= 1;
				_elementsCount -= 1;
				_mArray[_currentElementIndex].count -= 1;
				return _mArray[_currentElementIndex].len;
			} else {
				return null;
			}
		}
		
		function toLongest(){
			var i = _mArray.length - 1;
			while (i >= 0) {
				if (_mArray[i].count > 0){
					_currentElementIndex = i;
					updateIndex(i);
					return;
				}
				i -= 1;
			}
			throw new Error();
		}
		
		this.getElementsCount = getElementsCount;
		this.getLength = getCurrentElementLength;
		this.getCount = getCurrentElementCount;
		this.hasNext = hasNext;
		this.hasNextLength = hasNextLength;
		this.hasAny = hasAny;
		this.nextLength = nextLength;
		this.next = next;
		this.getLongestLength = getLongestLength;
		this.take = take;
		this.toLongest = toLongest;
	};
});
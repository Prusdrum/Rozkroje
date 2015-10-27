/**
 * @author Jerry
 */
define(
['data-validator'],
function(Valid){
	return function(table){
		var warningData = [];
		
		this.getRawDataFromTable = function (table, warningPanel) {
			var rawData = _getRawData(table);
			
			return rawData;
		};
		
		this.getWarningMessages = function(){
			return warningData;
		};
		
		function _getRawData(table){
			var rowsCount = table.countRows(),
				i, rawData = [], rowFromData, isValid, warningMessage;
			
			for (i = 0; i < rowsCount; i++){
				rowFromData = table.getDataAtRow(i);
				try {
					isValid = Valid.validRow(rowFromData, i);
					if (isValid) {
						rawData.push(_getParsedRow(rowFromData));
					}	
				} catch (err) {
					_updateWarningArray(err);
				}
			}
			return rawData;
		}
		
		function _getParsedRow(row){
			return {
				len: parseInt(row[0], 10),
				count: parseInt(row[1], 10)
			};
		}
		
		function _updateWarningArray(err){
			warningData.push(err);
		}
	};
});

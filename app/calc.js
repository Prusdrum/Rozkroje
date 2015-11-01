/**
 * @author Jerry
 */
define(
['data-collector', 'data-collection','joint-algorithm', 'no-joint-algorithm'],
function(DataCollector, DataCollection, JointAlgo, NoJointAlgo){
	return function(inputTable, resultTable, DOM){
		var rawData,
			refLen,
			isJointEnabled,
			jointLen,
			dataCollector,
			dataObject,
			resultData,
			algorithm,
			WARNING_HTML_TAG = 'p',
			errors,
			sheetConf = {
				description: {
					'Id':{
						row: 0,
						text: 'Identyfikator lagi'
					},
					'Sum': {
						row: 1,
						text: 'Suma długości elementów'
					},
					'Waste': {
						row: 2,
						text: 'Odpad'
					},
					'Count': {
						row: 3,
						text: 'Liczba elementów'
					}
				}
			};
		
		this.Calculate = function(){
			_instantiate();
			_getData();
			_updateWarningConsole();
		};
		
		function _instantiate(){
			dataCollector = new DataCollector(inputTable);
			rawData = dataCollector.getRawDataFromTable(inputTable);
			refLen = parseInt(DOM.referenceLength.value, 10);
			isJointEnabled = DOM.isJointEnabled.checked;
			jointLen = parseInt(DOM.jointLength.value, 10);
			errors = dataCollector.getWarningMessages();
		}
		
		function _getData(){
			dataObject = new DataCollection(rawData);
			if (dataObject.hasAny()){
				_calculateResult();
			}
		}
		
		function _calculateResult(){
			algorithm = (isJointEnabled ? 
				(new JointAlgo(dataObject, refLen, jointLen)) : 
				(new NoJointAlgo(dataObject, refLen)));
				
			try {
				resultData = algorithm.getResult();
				_updateResultTable();
			} catch (err) {
				errors.push(err);
			}
			
			
		}
		
		function _updateResultTable(){
			var elements, col;
			resultTable.clear();
			_initDescriptionCells();
			resultData.forEach(function(collection, index){
				col = index + 1;
				elements = collection.elements;
				
				_updateDescriptionCells(col, collection);
				
				elements.forEach(function(value, row){
					row += 4;
					resultTable.setDataAtCell(row, col, value);
				});
			});
		}
		
		function _updateDescriptionCells(col, collection){
			var count = collection.elements.length,
				sum = collection.sum,
				id = collection.index,
				waste = refLen - sum;
			
			resultTable.setDataAtCell(sheetConf.description['Count'].row, col, count);
			resultTable.setDataAtCell(sheetConf.description['Sum'].row, col, sum);
			resultTable.setDataAtCell(sheetConf.description['Waste'].row, col, waste);
			resultTable.setDataAtCell(sheetConf.description['Id'].row, col, id);
		}
		
		function _initDescriptionCells(){
			var firstCol = 0,
				conf = sheetConf.description;
			
			for (var element in conf){
				resultTable.setDataAtCell(conf[element].row, firstCol, conf[element].text);
			}
		}
		
		function _updateWarningConsole(){
			_clearWarningPanel();
			_addNewErrorsToPanel();
		}
		
		function _clearWarningPanel(){
			DOM.warningPanel.innerHTML = '';
		}
		
		function _addNewErrorsToPanel(){
			var	i = 0, l = errors.length, areErrors = (l > 0);
			
			if (areErrors){
				_showWarningPanel();
				for (i; i < l; i++){
					_addErrorToPanel(errors[i]);
				}
			}
		}
		
		function _addErrorToPanel(error){
			DOM.warningPanel.appendChild(_getErrorHTML(error));
		}
		
		function _showWarningPanel(){
			$(DOM.warningPanel).show("medium");
		}
		
		function _getErrorHTML(message){
			var p = document.createElement(WARNING_HTML_TAG);
			p.innerHTML = message;
			return p;
		}
	};
});

/**
 * @author Jerry
 */
define(
['data-collector', 'data-collection','joint-algorithm', 'no-joint-algorithm'],
function(DataCollector, DataCollection, JointAlgo, NoJointAlgo){
	return function(inputTable, DOM){
		var rawData,
			refLen,
			isJointEnabled,
			jointLen,
			dataCollector,
			dataObject,
			resultData,
			algorithm,
			WARNING_HTML_TAG = 'p',
			errors;
		
		this.Calculate = function(){
			_instantiate();
			_getData();
			_updateResultTable();
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
			} catch (err) {
				errors.push(err);
			}
		}
		
		function _updateResultTable(){
			
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

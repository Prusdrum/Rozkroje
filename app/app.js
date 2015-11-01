/**
 * @author Jerry
 */
define(['calc'], function(Calc) {
	return function() {
		var DOM = {},
			inputTableDOM = document.getElementById('inputData'),
			resultTableDOM = document.getElementById('resultData'),
			inputTable,
			resultTable,
		    isInit = false,
		    $calcBtn = $('#calculateBtn'),
		    $resetBtn = $('#resetBtn');
		
		DOM.referenceLength = document.getElementById('referenceLength');
		DOM.jointLength = document.getElementById('jointLength');
		DOM.isJointEnabled = document.getElementById('isJointEnabled');
		DOM.warningPanel = document.getElementById('warningPanel');
		
		this.Init = function() {
			initialization();
		};

		function initialization() {
			if (!isInit){
				initInputDataContainer();
				initResultDataContainer();
				initEvents();
				isInit = true;
			}
		}

		function initInputDataContainer() {
			var inputHeaders = ["Długość", "Ilość sztuk"],
			    colsCount = inputHeaders.length;

			inputTable = new Handsontable(inputTableDOM, {
				minSpareRows : 1,
				startRows: 25,
				minCols : colsCount,
				startCols : colsCount,
				maxCols : colsCount,
				rowHeaders : true,
				colHeaders : inputHeaders,
				contextMenu : false
			});
		}
		
		function initResultDataContainer(){
			resultTable = new Handsontable(resultTableDOM, {
				startRows: 100,
				startCols : 100,
				rowHeaders : true,
				colHeaders: true,
				contextMenu : false,
				fixedColumnsLeft: 1,
				fixedRowsTop: 4
			});
		}

		function initEvents() {
			$resetBtn.click(function() {
				clearGrid();
			});
			$calcBtn.click(function() {
				calculate();
			});
		}

		function clearGrid() {
			inputTable.clear();
		}

		function calculate() {
			var calc = new Calc(inputTable, resultTable, DOM);
			
			calc.Calculate();
		}
	};
});


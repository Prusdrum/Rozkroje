/**
 * @author Jerry
 */
define(['calc'], function(Calc) {
	return function() {
		var DOM = {},
			inputTableDOM = document.getElementById('inputData'),
			inputTable,
		    isInit = false,
		    $calcBtn = $('#calculateBtn'),
		    $resetBtn = $('#resetBtn');
		
		DOM.referenceLength = document.getElementById('referenceLength');
		DOM.resultTable = document.getElementById('resultData');
		DOM.jointLength = document.getElementById('jointLength');
		DOM.isJointEnabled = document.getElementById('isJointEnabled');
		DOM.warningPanel = document.getElementById('warningPanel');
		
		this.Init = function() {
			initialization();
		};

		function initialization() {
			if (!isInit){
				initInputDataContainer();
				initEvents();
				isInit = true;
			}
		}

		function initInputDataContainer() {
			var inputHeaders = ["Długość", "Ilość sztuk"],
			    colsCount = inputHeaders.length;

			inputTable = new Handsontable(inputTableDOM, {
				minSpareRows : 1,
				startRows: 10,
				minCols : colsCount,
				startCols : colsCount,
				maxCols : colsCount,
				rowHeaders : true,
				colHeaders : inputHeaders,
				contextMenu : false
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
			var calc = new Calc(inputTable, DOM);
			
			calc.Calculate();
		}
	};
});


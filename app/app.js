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
			var sheetConf = {
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
				},
				rowCount = getObjectPropertiesCount(sheetConf.description);
				
				
			resultTable = new Handsontable(resultTableDOM, {
				startRows: 100,
				startCols : 100,
				rowHeaders : true,
				colHeaders: true,
				contextMenu : false,
				fixedColumnsLeft: 1,
				fixedRowsTop: 4,
				cells: function(row, col, prop){
					var cellProperties = {};
					
					if (row < rowCount) {
						cellProperties.renderer = boldCellRenderer;
					}
					
					return cellProperties;
				}
			});

			resultTable.sheetConf = sheetConf;
		}
		
	 	function boldCellRenderer(instance, td, row, col, prop, value, cellProperties) {
	    	Handsontable.renderers.TextRenderer.apply(this, arguments);
		    td.style.fontWeight = 'bold';
		    td.style.color = 'green';
		    td.style.background = '#CEC';
	  	}
	  	
	  	function getObjectPropertiesCount(object){
	  		var i = 0;
	  		
			for (var prop in object){
				i += 1;
			}
			return i;
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
			resultTable.clear();
		}

		function calculate() {
			var calc = new Calc(inputTable, resultTable, DOM);
			
			calc.Calculate();
		}
	};
});


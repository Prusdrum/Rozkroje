const divisionAPI = require('./api/division');
const TableService = require('./service/tableService');
var Handsontable = require('handsontable');
require('handsontable/dist/handsontable.full.css');
const ko = require('knockout');
const _ = require('lodash');

const rootTarget = document.querySelector('#app');
const tableTarget = document.querySelector('#inputTable');

const App = require('./App');

const injector = {
    ko: () => ko,
    Handsontable: () => Handsontable,
    divisionAPI: () => divisionAPI,
    tableService: () => { return new TableService(Handsontable, _); }
}

ko.applyBindings(new App(injector, tableTarget), rootTarget)
const divisionAPI = require('./api/division');
const TableService = require('./service/tableService');
var Handsontable = require('handsontable');
require('handsontable/dist/handsontable.full.css');
require('../app.css'); 
const ko = require('knockout');
const _ = require('lodash');
const tracker = require('./service/tracker');
const copyService = require('./service/copyService');

const rootTarget = document.querySelector('#app');
const tableTarget = document.querySelector('#inputTable');

const App = require('./App');

const injector = {
    ko: () => ko,
    Handsontable: () => Handsontable,
    divisionAPI: () => divisionAPI,
    tableService: () => { return new TableService(Handsontable, _); },
    tracker: () => tracker,
    copyService: () => copyService
}

ko.applyBindings(new App(injector, tableTarget), rootTarget)
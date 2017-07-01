const divisionAPI = require('./api/division');
var Handsontable = require('handsontable');
const css = require('handsontable/dist/handsontable.full.css');
const ko = require('knockout');

const rootTarget = document.querySelector('#app');
const tableTarget = document.querySelector('#inputTable');

const App = require('./App');


ko.applyBindings(new App(ko, Handsontable, divisionAPI, tableTarget), rootTarget)
const divisionAPI = require('./api/division');
const TableService = require('./service/tableService');
var Handsontable = require('handsontable');
const jquery = require('jquery');
//add jquery to globalspace to make notifyjs working
window.$ = jquery;
require('../lib/notify.min');
require('handsontable/dist/handsontable.full.css');
require('../app.css'); 
const ko = require('knockout');
const _ = require('lodash');
const tracker = require('./service/tracker');
const copyService = require('./service/copyService');
const notifyService = require('./service/notifyService');
require('./utils/knockout.extenders')(ko);
const rootTarget = document.querySelector('#app');
const tableTarget = document.querySelector('#inputTable');

const App = require('./App');

const locale = window.settings.locale;

const injector = {
    ko: () => ko,
    text: () => require(`../../locales/${locale}.json`),
    Handsontable: () => Handsontable,
    divisionAPI: () => divisionAPI,
    tableService: () => { return new TableService(Handsontable, _, injector.text); },
    tracker: () => tracker,
    copyService: () => copyService,
    notifyService: () => notifyService,
    
}

ko.applyBindings(new App(injector, tableTarget), rootTarget)
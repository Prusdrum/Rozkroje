const referenceLength = 12000;

class App {
    constructor(injector, tableTarget) {
        this.ko = injector.ko();
        this.divisionAPI = injector.divisionAPI();
        this.tableService = injector.tableService();

        const table = this.tableService.createInputTable(tableTarget); 

        this.result = this.ko.observableArray([]);
        this.table = table;
        this.showLoader = this.ko.observable(false);
        this.showConfiguration = this.ko.observable(true);
        this.showInputSection = this.ko.observable(true);
        this.showResultSection = this.ko.observable(true);
    }

    sendData() {
        const elements = this.tableService.getValues(this.table);    
        this.showLoader(true);

        this.divisionAPI.getDivision(elements, referenceLength).then((division) => {
            this.result(division);
            this.showLoader(false);
            this.showResultSection(true);
        });
    }

    toggleConfig() {
        this.showConfiguration(!this.showConfiguration())
    }

    toggleInputSection() {
        this.showInputSection(!this.showInputSection())
    }

    toggleResultSection() {
        this.showResultSection(!this.showResultSection())
    }
}

module.exports = App;
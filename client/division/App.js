class App {
    constructor(injector, tableTarget) {
        this.ko = injector.ko();
        this.divisionAPI = injector.divisionAPI();
        this.tableService = injector.tableService();
        this.tracker = injector.tracker();

        const table = this.tableService.createInputTable(tableTarget); 

        this.result = this.ko.observableArray([]);
        this.referenceLength = this.ko.observable(12000);

        this.throttledReferenceLength = this.ko
                            .computed(this.referenceLength)
                            .extend({ throttle: 400 });
    
        this.throttledReferenceLength.subscribe((val) => {
            this.tracker.referenceLengthChanged(val);
        }, this);

        this.table = table;
        this.showLoader = this.ko.observable(false);
        this.showConfiguration = this.ko.observable(true);
        this.showInputSection = this.ko.observable(true);
        this.showResultSection = this.ko.observable(true);
    }

    sendData() {
        if (this.showLoader()) {
            return;
        }

        const elements = this.tableService.getValues(this.table);   
        const referenceLength = this.referenceLength();

        this.tracker.calculateClicked(elements, referenceLength);
        this.showLoader(true);

        this.divisionAPI.getDivision(elements, referenceLength).then((division) => {
            this.result(division);
            this.showLoader(false);
            this.showResultSection(true);
        });
    }

    resetData() {
        this.tracker.resetClicked();
        this.tableService.clearTable(this.table);
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
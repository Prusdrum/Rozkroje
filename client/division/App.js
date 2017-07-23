class App {
    constructor(injector, tableTarget) {
        this.ko = injector.ko();
        this.divisionAPI = injector.divisionAPI();
        this.tableService = injector.tableService();
        this.tracker = injector.tracker();
        this.copyService = injector.copyService();

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
        this.stats = this.ko.observable(null);
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
            
            this.stats(this.getStats());
        });
    }

    getStats() {
        const wasteSumInMilimeters = _.chain(this.result())
            .map('waste')
            .sum()
            .value();

        const wasteSumInMeters = wasteSumInMilimeters / 1000;
        const countSum = _.chain(this.result())
            .map('count')
            .sum()
            .value();
        
        return {
            wasteSumInMeters,
            countSum
        }
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

    copyResult() {
        this.tracker.copyClicked();
        this.copyService.copy(this._convertResultToHtml());
    }

    _convertResultToHtml() {
        const header = (
            `Wzór\tIlość\tOdpad`
        );

        const body = this.result().map(result => {
            const elements = result.elements.join(', ');
            const count = result.count;
            const waste = `${result.waste} mm`;
            return `${elements}\t${count}\t${waste}`;
        }).join('\n');

        const template = (
            `${header}\n${body}`
        );

        return template;
    }
}

module.exports = App;

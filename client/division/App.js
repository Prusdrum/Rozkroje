class App {
    constructor(injector, tableTarget) {
        this.ko = injector.ko();
        this.divisionAPI = injector.divisionAPI();
        this.tableService = injector.tableService();
        this.tracker = injector.tracker();
        this.copyService = injector.copyService();
        this.notifyService = injector.notifyService();
        this.text = injector.text();

        const table = this.tableService.createInputTable(tableTarget); 

        this.result = this.ko.observableArray([]);
        this.referenceLength = this.ko.observable(12000);

        this.throttledReferenceLength = this.ko
                            .computed(this.referenceLength)
                            .extend({ throttle: 400 });
    
        this.throttledReferenceLength.subscribe((referenceLength) => {
            this.tracker.referenceLengthChanged(referenceLength);
        }, this);

        this.table = table;
        this.stats = this.ko.observable(null);
        this.showLoader = this.ko.observable(false);
        this.showConfiguration = this.ko.observable(true);
        this.showInputSection = this.ko.observable(true);
        this.showResultSection = this.ko.observable(true);

        this.stats = {
            wasteSumInMeters: this.ko.observable(null),
            countSum: this.ko.observable(null)
        }
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
            this.notifyService.showInfo(this.text.calculationDone);
            
            this.setStats();
        });
    }

    setStats() {
        const wasteSumInMilimeters = _.chain(this.result())
            .map('waste')
            .sum()
            .value();

        const wasteSumInMeters = wasteSumInMilimeters / 1000;
        const countSum = _.chain(this.result())
            .map('count')
            .sum()
            .value();
        
       this.stats.wasteSumInMeters(wasteSumInMeters);
       this.stats.countSum(countSum);
    }

    resetData() {
        this.tracker.resetClicked();
        this.tableService.clearTable(this.table);
        this.notifyService.showWarning(this.text.dataTableCleared);
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
        this.notifyService.showInfo(this.text.copiedToClipboard);
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

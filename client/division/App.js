const sampleDivision = {
	elements: [
        { length : 2000, count : 200 },
        { length : 2500, count : 200 },
        { length : 6500, count : 200 },
        { length : 4500, count : 200 },
        { length : 450, count : 500 }
    ],
    referenceLength: 12000
}

class App {
    constructor(ko, Handsontable, divisionAPI, tableTarget) {
        var data = [
            ["", "Ford", "Volvo", "Toyota", "Honda"],
            ["2016", 10, 11, 12, 13],
            ["2017", 20, 11, 14, 13],
            ["2018", 30, 15, 12, 13]
        ];

        var hot = new Handsontable(tableTarget, {
            data: data,
            rowHeaders: true,
            colHeaders: true
        });

        this.resultText = ko.observable("");
        this.divisionAPI = divisionAPI;
    }

    sendData() {
        this.divisionAPI.getDivision(sampleDivision.elements, sampleDivision.referenceLength).then((division) => {
            this.resultText(JSON.stringify(division, null, 2))
        });
    }
}

module.exports = App;
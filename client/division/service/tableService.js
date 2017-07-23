class TableService {
    constructor(Handsontable, _) {
        this.Handsontable = Handsontable;
        this._ = _;
    }

    createInputTable(target) {
        const inputHeaders = ["Długość [mm]", "Ilość sztuk"];
        const colsCount = inputHeaders.length;

        const table = new this.Handsontable(target, {
            minSpareRows : 1,
            startRows: 25,
            minCols : colsCount,
            startCols : colsCount,
            maxCols : colsCount,
            rowHeaders : true,
            colHeaders : inputHeaders,
            contextMenu : false
        });

        return table;
    }

    getValues(table) {
        const rows = table.countRows();
        const data = [];
        const radix = 10;
        const {_} = this;

        for (let i = 0; i < rows; i += 1) {
            const row = table.getDataAtRow(i);
            const length = parseInt(row[0], radix);
            const count = parseInt(row[1], radix);

            if (!_.isNaN(length) && !_.isNaN(count)) {
                data.push({
                    length, count
                });
            }
        }

        return data;
    }

    clearTable(table) {
        table.clear();
        console.log(table);
    }
}


module.exports = TableService;
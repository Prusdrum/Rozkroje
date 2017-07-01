const division = require('./api/division');
var Handsontable = require('handsontable');

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

var data = [
  ["", "Ford", "Volvo", "Toyota", "Honda"],
  ["2016", 10, 11, 12, 13],
  ["2017", 20, 11, 14, 13],
  ["2018", 30, 15, 12, 13]
];

var container = document.getElementById('example');
var hot = new Handsontable(container, {
  data: data,
  rowHeaders: true,
  colHeaders: true
});

document.querySelector('#sendBtn').addEventListener('click', () => {
    division.getDivision(sampleDivision.elements, sampleDivision.referenceLength).then((division) => {
        console.log(division);
    });
});


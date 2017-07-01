const division = require('./api/division');

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

document.querySelector('#sendBtn').addEventListener('click', () => {
    division.getDivision(sampleDivision.elements, sampleDivision.referenceLength).then((division) => {
        console.log(division);
    });
});


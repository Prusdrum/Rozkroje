const a = 3;
const division = require('./api/division');

document.querySelector('#sendBtn').addEventListener('click', () => {
    division.getDivision().then((division) => {
        console.log(division);
    })
})


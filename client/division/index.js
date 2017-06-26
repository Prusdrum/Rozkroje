const a = 3;
const axios = require('axios');

const doRequest = () => {
    axios.get('/webapi/division').then(function(response){
        console.log(response);
    });
}

document.querySelector('#sendBtn').addEventListener('click', () => {
    doRequest();
})


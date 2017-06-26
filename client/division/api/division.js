const axios = require('axios');

module.exports = {
    getDivision: () => {
        return axios.get('/webapi/division').then((response) => {
            return response.data;
        });
    }
}
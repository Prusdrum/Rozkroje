const axios = require('axios');
const _ = require('lodash');

module.exports = {
    getDivision: (elements, referenceLength) => {
        const requestBody = mapToRequestData(elements, referenceLength);

        return axios.post('/webapi/division', requestBody).then((response) => {
            return response.data;
        });
    }
}

const mapToRequestData = (elements, referenceLength) => {
    return {
        elements: _.map(elements, mapElement),
        referenceLength: referenceLength
    };
}

const mapElement = (element) => {
    return {
        length: element.length,
        count: element.count
    };
}

const mapResponse = (response) => {
    return {
        elements: response.elements,
        count: response.count,
        waste: response.waste
    }
}
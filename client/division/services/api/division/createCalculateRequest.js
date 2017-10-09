export default (request) => (elements, referenceLength) => {
    const requestBody = mapToRequestData(elements, referenceLength);
    
    return request.post('/webapi/division', requestBody).then((response) => {
        return response.data;
    });
}

const mapToRequestData = (elements, referenceLength) => {
    return {
        elements: elements.map(mapElement),
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
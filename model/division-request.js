const _ = require('lodash');

module.exports = (elements) => {
    return _.chain(elements)
        .map(ensureType)
        .value();
}



const ERRORS = {
    NO_COUNT_SPECIFIED: 'NO_COUNT_SPECIFIED' 
}

const ensureType = (element) => {
    if (_.isUndefined(element.count)) {
        throw new Error(NO_COUNT_SPECIFIED);
    }

    return element;
}
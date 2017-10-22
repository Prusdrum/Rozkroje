const _ = require('lodash');

const elementsAreShorterThanReference = (data, referenceLength) => {
    return _.every(data, element => element.length <= referenceLength);
}

module.exports = elementsAreShorterThanReference;
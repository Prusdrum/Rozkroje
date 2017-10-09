const _ = require('lodash');

const addWaste = (pattern, referenceLength) => {
    const difference = referenceLength - _.sum(pattern.elements);

    return {
        elements: [...pattern.elements],
        count: pattern.count,
        waste: difference
    };
}

module.exports = addWaste;
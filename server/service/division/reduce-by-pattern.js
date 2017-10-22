const _ = require('lodash');

const reduceByPattern = (data, pattern) => {
    const {elements, count} = pattern;
    const counted = _.countBy(elements);

    return _.map(data, (dataElement) => {
        const elementsInPattern = counted[dataElement.length];

        const toReduce = elementsInPattern ? elementsInPattern * count : 0;

        return {
            count: dataElement.count - toReduce,
            length: dataElement.length
        }
    });
}

module.exports = reduceByPattern;
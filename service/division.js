const _ = require('lodash');

const getDivision = () => {

}

const findPattern = (data, referenceLength) => {
    const sorted = _.chain(data)
        .sortBy('length')
        .reverse()
        .value();
    
    const pattern = [];

    _.forEach(sorted, (element, index) => {
        
        const {count} = element;
        let i = count;
        while (i > 0) {
            const currentSum = _.sum(pattern);

            if (currentSum + element.length <= referenceLength) {
                pattern.push(element.length);
                i--;
            } else {
                break;
            }        
        }
    });

    const minCount = _.chain(pattern)
        .uniq()
        .map((patternElement) => {
            return _.find(data, (dataElement) => {
                return dataElement.length === patternElement
            });
        })
        .map('count')
        .min()
        .value();

    return {
        pattern,
        count: minCount
    }
}


module.exports = { getDivision, findPattern };
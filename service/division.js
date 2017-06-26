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

    const countedBy = _.countBy(pattern);
    const minCount = _.chain(_.keys(countedBy).map(elementLength => {
        const matchingElement = _.find(data, (dataElement) => {
            return dataElement.length.toString() === elementLength;
        });

        const usedNTimes = countedBy[elementLength];
        const possibleCountToUse = Math.floor(matchingElement.count / usedNTimes);
        const count = _.min([matchingElement.count, possibleCountToUse]);

        return count;
    }))
    .min()
    .value();


    return {
        pattern,
        count: minCount
    }
}


module.exports = { getDivision, findPattern };
const _ = require('lodash');
const {ElementLongerThanReferenceError, InfiniteLoopBreakerError} = require('./errors');

const getDivision = (data, referenceLength) => {
    const division = calculateDivision(removeDuplicates(data), referenceLength);

    return _.map(division, (pattern) => {
        return addWaste(pattern, referenceLength);
    });
}

const calculateDivision = (data, referenceLength) => {
    if (!elementsAreShorterThanReference(data, referenceLength)) {
        throw new ElementLongerThanReferenceError();
    }

    const result = [];
    let dataToCalculate = [...data];
    const breaker = calculateLoopBreaker(data, referenceLength);
    let breakerCounter = 0;

    while (hasAnyElements(dataToCalculate)) {
        if (breakerCounter > breaker) {
            throw new InfiniteLoopBreakerError();
        }
        const pattern = findPattern(dataToCalculate, referenceLength);

        result.push(pattern);

        dataToCalculate = reduceByPattern(dataToCalculate, pattern);
        breakerCounter += 1;
    }

    return result;
}

const calculateLoopBreaker = (data, referenceLength) => {
    return _.chain(data)
        .map('count')
        .sum()
        .value() * 1000;
}

const addWaste = (pattern, referenceLength) => {
    const difference = referenceLength - _.sum(pattern.elements);

    return {
        elements: [...pattern.elements],
        count: pattern.count,
        waste: difference
    };
}

const elementsAreShorterThanReference = (data, referenceLength) => {
    return _.every(data, element => element.length <= referenceLength);
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
        elements: pattern,
        count: minCount
    }
}

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

const hasAnyElements = (data) => {
    return _.some(data, element => element.count > 0);
}

const removeDuplicates = (dataToCompact) => {
    const data = dataToCompact.map(a => ({ length: a.length, count: a.count }));

    for (let i = 0; i < data.length; i += 1) {
        let refElement = data[i];

        for (let j = i + 1; j < data.length; j += 1) {
            let checkedElement = data[j];
            if (checkedElement.length === refElement.length) {
                refElement.count += checkedElement.count;
                checkedElement.count = 0;
            }
        }
    }

    return data.filter(element => element.count > 0);
}


module.exports = { 
    getDivision, 
    calculateDivision,
    findPattern, 
    reduceByPattern,
    hasAnyElements,
    addWaste,
    removeDuplicates
};
const _ = require('lodash');
const logger = require('../logger');
const {ElementLongerThanReferenceError, InfiniteLoopBreakerError} = require('./errors');
const hasAnyElements = require('./has-any-elements');
const removeDuplicates = require('./remove-duplicates');
const reduceByPattern = require('./reduce-by-pattern');
const elementsAreShorterThanReference = require('./elements-are-shorter-than-reference');
const addWaste = require('./add-waste');
const findPattern = require('./find-pattern');

const getDivision = (data, referenceLength) => {
    const division = calculateDivision(removeDuplicates(data), referenceLength);

    return _.map(division, (pattern) => {
        return addWaste(pattern, referenceLength);
    });
}

const calculateDivision = (data, referenceLength) => {
    if (!elementsAreShorterThanReference(data, referenceLength)) {
        logger.log('error', JSON.stringify(data));
        throw new ElementLongerThanReferenceError();
    }

    logger.log('info', JSON.stringify(data));

    const result = [];
    let dataToCalculate = [...data];
    const breaker = calculateLoopBreaker(data, referenceLength);
    let breakerCounter = 0;

    while (hasAnyElements(dataToCalculate)) {
        if (breakerCounter > breaker) {
            logger.log('error', JSON.stringify(data));
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

module.exports = { 
    getDivision, 
    calculateDivision,
    findPattern, 
    reduceByPattern,
    hasAnyElements,
    addWaste,
    removeDuplicates,
    elementsAreShorterThanReference
};
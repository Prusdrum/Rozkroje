const sum = (a, b) => a + b;

export const getWasteSumInMeters = (result) => {
    const wasteSumInMilimeters = result.map((element) => {
        return element.waste * element.count;
    }).reduce(sum, 0);

    return wasteSumInMilimeters / 1000;
}

export const getCountSum = (result) => {
    return result
        .map(element => element.count)
        .reduce(sum, 0);
}

export const getMaterialSumInMeters = (result, referenceLength) => {
    const countSum = getCountSum(result);
    return countSum * referenceLength / 1000;
}
import {createSelector} from 'reselect';
import isNaN from 'lodash/isNaN';
import {getCountSum, getMaterialSumInMeters, getWasteSumInMeters} from '../services/statistics/calculationStatistics';

export const getReferenceLength = (state) => state.division.referenceLength;
export const getCalculatedData = (state) => state.division.calculatedData;
export const isSending = (state) => state.division.isSending;

const getInputData = (state) => state.division.inputData;

export const getValuesToSend = createSelector(
    getInputData,
    (inputData) => {
        const rows = inputData.length;
        const data = [];
        const radix = 10;

        return inputData
        .filter(data => !!data)
        .reduce((previous, current) => { 
            const length = parseInt(current[0], radix);
            const count = parseInt(current[1], radix);

            if (!isNaN(length) && !isNaN(count)) {
                return previous.concat([{length, count}])
            }

            return previous;
        }, []);
    }
);

export const getStatistics = createSelector(
    getCalculatedData, getReferenceLength,
    (calculatedData, referenceLength) => {
        if (!calculatedData) {
            return null;
        } else {
            return {
                countSum: getCountSum(calculatedData),
                materialSumInMeters: getMaterialSumInMeters(calculatedData, referenceLength),
                wasteSumInMeters: getWasteSumInMeters(calculatedData)
            }
        }
    }
);

import {handleActions} from 'redux-actions';
import {
    CHANGE_REFERENCE_LENGTH,
    CHANGE_INPUT_TABLE_DATA,
    START_SENDING,
    STOP_SENDING,
    DIVISION_CALCULATED
} from './actions';

const initialState = {
    referenceLength: 12000,
    inputData: [],
    isSending: false,
    calculatedData: null
};

export default handleActions({
    [CHANGE_REFERENCE_LENGTH]: (state, {payload:referenceLength}) => ({
        ...state,
        referenceLength
    }),

    [START_SENDING]: (state) => ({
        ...state,
        isSending: true
    }),

    [STOP_SENDING]: (state) => ({
        ...state,
        isSending: false
    }),

    [DIVISION_CALCULATED]: (state, {payload:calculatedData}) => ({
        ...state,
        calculatedData
    }),

    [CHANGE_INPUT_TABLE_DATA]: (state, {payload:{row, column, value}}) => {
        const newInputData = [...state.inputData];

        if (!newInputData[row]) {
            newInputData[row] = [];
        }

        newInputData[row][column] = value;

        return {
            ...state,
            inputData: newInputData
        };
    }
}, initialState);


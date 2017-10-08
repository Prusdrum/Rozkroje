import {handleActions} from 'redux-actions';
import {
    CHANGE_REFERENCE_LENGTH,
    CHANGE_INPUT_TABLE_DATA
} from './actions';

const initialState = {
    referenceLength: 12000,
    inputData: []
};

export default handleActions({
    [CHANGE_REFERENCE_LENGTH]: (state, {payload:referenceLength}) => ({
        ...state,
        referenceLength
    }),

    [CHANGE_INPUT_TABLE_DATA]: (state, {payload:data}) => {
        // const 

        return {
            ...state
        };
    }
}, initialState);


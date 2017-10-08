import {handleActions} from 'redux-actions';
import {CHANGE_REFERENCE_LENGTH} from './actions';

const initialState = {
    referenceLength: 12000
};

export default handleActions({
    [CHANGE_REFERENCE_LENGTH]: (state, {payload:referenceLength}) => ({
        ...state,
        referenceLength
    })
}, initialState);


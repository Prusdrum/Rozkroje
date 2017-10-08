import {createAction} from 'redux-actions';
import {getValuesToSend, getReferenceLength} from './selectors';
import calculateRequest from '../services/api/division/calculateRequest';

export const CHANGE_REFERENCE_LENGTH = 'DIVISION/CHANGE_REFERENCE_LENGTH';
export const changeReferenceLength = createAction(CHANGE_REFERENCE_LENGTH);

export const CHANGE_INPUT_TABLE_DATA = 'DIVISION/CHANGE_INPUT_TABLE_DATA';
export const changeInputTableData = createAction(CHANGE_INPUT_TABLE_DATA);

export const START_SENDING = 'DIVISION/START_SENDING';
const startSending = createAction(START_SENDING);

export const STOP_SENDING = 'DIVISION/STOP_SENDING';
const stopSending = createAction(STOP_SENDING);

export const DIVISION_CALCULATED = 'DIVISION/DIVISION_CALCULATED';
const divsionCalculated = createAction(DIVISION_CALCULATED);


export const sendData = () => (dispatch, getState) => {
    const elements = getValuesToSend(getState());
    const referenceLength = getReferenceLength(getState());

    dispatch(startSending());
    return calculateRequest(elements, referenceLength)
        .then((data) => Promise.resolve(dispatch(divsionCalculated(data))))
        .then(() => dispatch(stopSending()));
}
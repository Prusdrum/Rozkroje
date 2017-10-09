import {createAction} from 'redux-actions';
import {I18n} from 'react-i18nify';
import {getValuesToSend, getReferenceLength, getCalculatedData} from './selectors';
import calculateRequest from '../services/api/division/calculateRequest';
import getTemplateToCopy from '../services/copy/getTemplateToCopy';
import copyToClipboard from '../services/copy/copyToClipboard';
import {showInfo, showError, showWarning} from '../services/notification/notificationService';

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
        .then(() => Promise.resolve(showInfo(I18n.t('division.calculationDone'))))
        .then(() => dispatch(stopSending()))
        .catch(() => {
            showError(I18n.t('division.calculationError'));
            dispatch(stopSending());
        });
}

export const copyData = () => (dispatch, getState) => {
    const template = getTemplateToCopy(getCalculatedData(getState()));
    showInfo(I18n.t('division.copiedToClipboard'));
    copyToClipboard(template);
}

export const resetData = () => (dispatch, getState) => {
    showWarning(I18n.t('division.dataTableCleared'));
}
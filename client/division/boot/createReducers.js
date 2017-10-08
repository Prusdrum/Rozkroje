import {combineReducers} from 'redux';
import divisionReducer from '../state/reducer';

export default () => combineReducers({
    division: divisionReducer
});
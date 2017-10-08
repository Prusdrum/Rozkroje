import React from 'react';
import ReactDOM from 'react-dom';
import {I18n} from 'react-i18nify';
import {Provider} from 'react-redux';

import App from './App';
import createSetTranslations from './boot/setTranslations';
import createReducers from './boot/createReducers';
import createStore from './boot/createStore';
import {get} from './services/settings/settings';

import en from '../../locales/en.json';
import pl from '../../locales/pl.json';

const store = createStore(createReducers());

const currentLocale = get('locale');
const setTranslations = createSetTranslations(I18n);
setTranslations({
    en: en,
    pl: pl
}, currentLocale);

const rootTarget = document.querySelector('#app');

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
rootTarget);
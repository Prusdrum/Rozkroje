import React from 'react';
import ReactDOM from 'react-dom';
import {I18n} from 'react-i18nify';

import App from './App';
import createSetTranslations from './boot/setTranslations';
import en from '../../locales/en.json';
import pl from '../../locales/pl.json';

const currentLocale = window.settings.locale;
const setTranslations = createSetTranslations(I18n);
setTranslations({
    en: en,
    pl: pl
}, currentLocale);

const rootTarget = document.querySelector('#app');

ReactDOM.render(<App />, rootTarget);
import React from 'react';
import {I18n} from 'react-i18nify';
import LanguagePicker from './modules/Language/LanguagePicker';
import Header from './modules/Header/Header';
import Configuration from './modules/Configuration/Configuration';
import InputData from './modules/InputData/InputData';
import ResultData from './modules/ResultData/ResultData';

const App = () => (
    <div>
        <Header />
        <Configuration />
        <InputData />
        <ResultData /> 
    </div>
);

export default App;
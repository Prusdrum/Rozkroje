import React from 'react';
import {I18n} from 'react-i18nify';
import LanguagePicker from './modules/Language/LanguagePicker';
import Header from './modules/Header/Header';
import Configuration from './modules/Configuration/Configuration';
import InputData from './modules/InputData/InputData';
import ResultData from './modules/ResultData/ResultData';
import Container from './components/Container/Container'

const App = () => (
    <div>
        <Header />
        <Container>
            <Configuration />
            <InputData />
            <ResultData /> 
        </Container>
    </div>
);

export default App;
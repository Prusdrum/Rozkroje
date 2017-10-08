import React from 'react';
import {I18n} from 'react-i18nify';

const Header = () => (
    <div className="jumbotron text-center">
        <h1>{I18n.t('division.header')}</h1>
    </div>
);

export default Header;
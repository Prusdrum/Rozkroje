import React from 'react';
import {I18n} from 'react-i18nify';
import Styles from './Header.scss';

const Header = () => (
    <div className={Styles.header}>
        <h1 className={Styles.headerText}>{I18n.t('siteTitle')}</h1>
    </div>
);

export default Header;
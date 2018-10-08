import React from 'react';
import {I18n} from 'react-i18nify';
import Styles from './Header.scss';
import Container from '../../components/Container/Container'

const Header = () => (
    <div className={Styles.header}>
        <Container>
            <h1 className={Styles.headerText}>{I18n.t('siteTitle')}</h1>
        </Container>
    </div>
);

export default Header;
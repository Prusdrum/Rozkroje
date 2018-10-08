import React from 'react';
import {I18n} from 'react-i18nify';
import Styles from './Title.scss'

export default () => (
    <h1 className={Styles.title}> 
        {I18n.t('division.header')}
    </h1>
)
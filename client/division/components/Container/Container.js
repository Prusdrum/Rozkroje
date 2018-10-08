import React from 'react'
import Styles from './Container.scss'

export default ({children}) => (
    <div className={Styles.container}>
        {children}
    </div>
)
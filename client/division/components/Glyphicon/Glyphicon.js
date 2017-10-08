import React from 'react';

const Glyphicon = ({type = '', className = ''}) => (
    <span className={`glyphicon glyphicon-${type} ${className}`}></span>
);

export default Glyphicon;
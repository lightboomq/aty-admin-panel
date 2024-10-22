import React from 'react';
import s from '../styles/loader.module.css';

function Loader({classNameLoader, classNameBorder}) {
    
    return <span className={ `${s[classNameLoader]} ${s[classNameBorder]}`}>{}</span>;
}

export default Loader;

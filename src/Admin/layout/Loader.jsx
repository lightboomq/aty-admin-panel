import React from 'react';
import s from './loader.module.css';

function Loader({ color }) {
    return <span className={`${s.loader} ${s[color]}`}> </span>;
}

export default Loader;

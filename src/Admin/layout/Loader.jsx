import React from 'react';
import s from './loader.module.css';

function Loader({ color }) {
    return (
        <span className={s.loader} style={{ border: `5px dotted ${color}` }}>
            {' '}
        </span>
    );
}

export default Loader;

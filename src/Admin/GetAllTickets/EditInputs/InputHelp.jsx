import React from 'react';
import s from './input.module.css';
function InputHelp({ helpText }) {
    const [state, setState] = React.useState(helpText);
    

    return <textarea type='text' value={state} onChange={e => setState(e.target.value)} rows={state.length<200? 2 : 6} className={s.help} />;
}

export default InputHelp;

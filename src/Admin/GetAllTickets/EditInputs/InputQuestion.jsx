import React from 'react';
import s from './input.module.css';
function InputQuestion({ question }) {
    const [state, setState] = React.useState(question);

    return <textarea name='question' type='text' value={state} onChange={e => setState(e.target.value)} className={s.question} />;
}

export default InputQuestion;

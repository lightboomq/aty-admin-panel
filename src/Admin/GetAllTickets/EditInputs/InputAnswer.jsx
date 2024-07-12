import React from 'react';
import s from './input.module.css';
function InputAnswer({ answerText, i, questionId, checked }) {
    const [state, setState] = React.useState(answerText);

    return (
        <div className={s.wrapperAnswer}>
            <textarea name = {state} type='text' value={state} onChange={e => setState(e.target.value)} className={s.answer} />
            <input type='radio' value={i} name={questionId} defaultChecked={checked} />
        </div>
    );
}

export default InputAnswer;

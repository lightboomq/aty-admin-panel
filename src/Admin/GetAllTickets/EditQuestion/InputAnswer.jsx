import React from 'react';
import s from './editQuestion.module.css';
function InputAnswer({ answerText, questionId, isChecked }) {
    const [state, setState] = React.useState(answerText);

    return (
        <div className={s.wrapperAnswer}>
            <textarea name='answer' type='text' value={state} onChange={e => setState(e.target.value)} className={s.answer} />
            <input type='radio' name={questionId} defaultChecked={isChecked} />
        </div>
    );
}

export default InputAnswer;
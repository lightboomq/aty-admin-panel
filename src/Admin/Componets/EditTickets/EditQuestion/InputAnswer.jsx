import React from 'react';
import s from './editQuestion.module.css';
function InputAnswer({ answerText, isChecked, i}) {
    const [state, setState] = React.useState(answerText);

    return (
        <div className={s.wrapperAnswer}>
            <input name='answers' type='text' value={state} onChange={e => setState(e.target.value)} className={s.answer} />
            <input type='radio' name='correctAnswer' value={i} defaultChecked={isChecked} />
        </div>
    );
}

export default InputAnswer;

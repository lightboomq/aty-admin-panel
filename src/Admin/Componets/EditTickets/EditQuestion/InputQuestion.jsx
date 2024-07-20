import React from 'react';
import s from './editQuestion.module.css';
function InputQuestion({ question }) {
    const [state, setState] = React.useState(question);
    const questionRef = React.useRef(null);

    React.useEffect(() => {
        getHeight();
    }, []);
    function getHeight() {
        const heigth = questionRef.current.scrollHeight;
        questionRef.current.style.height = `${heigth}px`;
    }
    return (
        <textarea
            ref={questionRef}
            onInput={getHeight}
            name='question'
            type='text'
            value={state}
            onChange={e => setState(e.target.value)}
            className={s.question}
        />
    );
}

export default InputQuestion;

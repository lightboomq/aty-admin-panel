import React from 'react';
import s from '../ticketStyles/editQuestion.module.css';

function InputHelp({ helpText }) {
    const [state, setState] = React.useState(helpText);

    const helpRef = React.useRef(null);

    React.useEffect(() => {
        getHeight();
    }, []);
    
    function getHeight() {
        const heigth = helpRef.current.scrollHeight;
        helpRef.current.style.height = `${heigth}px`;
    }

    return (
        <textarea
            ref={helpRef}
            onInput={getHeight}
            type='text'
            name='help'
            value={state}
            onChange={e => setState(e.target.value)}
            className={s.textarea}
        />
    );
}

export default InputHelp;

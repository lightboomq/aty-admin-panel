import React from 'react';
import s from '../ticketStyles/editQuestion.module.css';
import gif from '../../../assets/check.gif';
import { ticketRequests } from '../../API';

function DeleteQuestion({
    idSelectedTicket,
    questionId,
    setSelectedTicket,
    numberQuestion,
    selectedTicket,
    setSelectedQuestion,
    setNumberQuestion,
    refOption,
}) {
    const [isGif, setIsGif] = React.useState(false);
   
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {isGif && <img style={{ marginRight: '10px' }} width={25} height={25} src={gif} alt='gif' />}
            <button
                type='button'
                onClick={() =>
                    ticketRequests.deleteQuestion(
                        idSelectedTicket,
                        questionId,
                        setSelectedTicket,
                        numberQuestion,
                        selectedTicket,
                        setSelectedQuestion,
                        setNumberQuestion,
                        refOption,
                        setIsGif
                    )
                }
                className={s.btn}
            >
                Удалить вопрос
            </button>
        </div>
    );
}

export default DeleteQuestion;

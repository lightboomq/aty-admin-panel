import React from 'react';
import s from '../ticketStyles/editQuestion.module.css';
import gif from '../../../assets/check.gif';

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
    const token = localStorage.getItem('token');
    
    async function delQuestion() {
        const action = confirm('Удалить выбраный вопрос? Все данные безвозратно будут удалены');

        if (!action) return;
        const res = await fetch('http://147.45.159.11/api/ticketEditor/deleteQuestion', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                ticketId: idSelectedTicket,
                questionId: questionId,
            }),
        });
        
        setIsGif(true);
        if (res.ok) {
            setTimeout(() => {
                refOption.current.textContent = `Изменить вопрос: ${numberQuestion}`;
                const cloneTicket = [...selectedTicket];
                cloneTicket.splice(numberQuestion, 1);
                const cloneQuestion = { ...selectedTicket[numberQuestion - 1] };
                setSelectedQuestion(cloneQuestion);
                setNumberQuestion(numberQuestion - 1);
                setSelectedTicket(cloneTicket);
                setIsGif(false);
            }, 1250);
        }
    }
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {isGif && <img style={{ marginRight: '10px' }} width={25} height={25} src={gif} alt='gif' />}
            <button type='button' onClick={delQuestion} className={s.btn}>
                Удалить вопрос
            </button>
        </div>
    );
}

export default DeleteQuestion;

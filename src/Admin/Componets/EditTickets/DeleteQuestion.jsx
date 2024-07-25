import React from 'react';
import s from '../../styles/deleteQuestion.module.css';
function DeleteQuestion({ selectedTicket, idSelectedTicket }) {
    const token = localStorage.getItem('token');
    async function delQuestion(e) {
        const questionId = e.target.getAttribute('id');
        const action = confirm('Удалить выбраный вопрос? Все данные безвозратно будут удалены');

        if (!action) return;
        await fetch('http://147.45.159.11/api/ticketEditor/deleteQuestion', {
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
    }
    return (
        <div className={s.wrapper}>
            {selectedTicket.map((question, i) => {
                return (
                    <div key={question.questionId} onClick={delQuestion} className={s.questionCard} id={question.questionId}>
                        {i + 1}
                    </div>
                );
            })}
        </div>
    );
}

export default DeleteQuestion;

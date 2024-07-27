import React from 'react';
import s from './editQuestion.module.css';
function DeleteQuestion({idSelectedTicket, questionId }) {
    const token = localStorage.getItem('token');
  
    async function delQuestion() {
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
        <button type='button' onClick={delQuestion} className={s.btn}>
            Удалить вопрос
        </button>
    );
}

export default DeleteQuestion;

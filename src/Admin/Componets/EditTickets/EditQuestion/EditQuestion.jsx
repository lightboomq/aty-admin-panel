
import React from 'react';
import InputQuestion from './InputQuestion.jsx';
import InputAnswer from './InputAnswer.jsx';
import InputHelp from './InputHelp.jsx';
import s from './editQuestion.module.css';
function EditQuestion({ selectedTicket, indexTicket, idSelectedTicket }) {
    const correctAnswer = selectedTicket[indexTicket].answers.findIndex(obj => obj.isCorrect === true);

    const token = localStorage.getItem('token');

    async function saveTicket(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        formData.append('ticketId', idSelectedTicket);
        formData.append('questionId', selectedTicket[indexTicket].questionId);

        await fetch('http://147.45.159.11/api/ticketEditor/editQuestion', {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });
    }

    return (
        <div className={s.wrapper}>
            <form onSubmit={saveTicket}>
                <div key={selectedTicket[indexTicket].questionId}>
                    {selectedTicket[indexTicket].img ? (
                        <img className={s.picture} src={selectedTicket[indexTicket].img} alt='' />
                    ) : (
                        <div className={`${s.withoutPicture} `}>Вопрос без рисунка</div>
                    )}

                    <InputQuestion question={selectedTicket[indexTicket].question} />

                    <div>
                        {selectedTicket[indexTicket].answers.map((answer, i) => {
                            return (
                                <InputAnswer
                                    key={`${answer}${i + 1}`}
                                    answerText={answer.answerText}
                                    correctAnswer={correctAnswer}
                                    isChecked={i === correctAnswer ? true : ''}
                                    i={i}
                                />
                            );
                        })}
                    </div>

                    <InputHelp helpText={selectedTicket[indexTicket].help} />
                </div>
                <button type='submit' className={s.btn}>
                    Сохранить изменения
                </button>
            </form>
        </div>
    );
}

export default EditQuestion;

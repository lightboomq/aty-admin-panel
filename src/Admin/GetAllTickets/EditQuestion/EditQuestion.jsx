import React from 'react';
import InputQuestion from './InputQuestion.jsx';
import InputAnswer from './InputAnswer.jsx';
import InputHelp from './InputHelp.jsx';
import s from './editQuestion.module.css';
function EditQuestion({ selectedTicket, indexTicket, idSelectedTicket, selectedTicketRef }) {
    const correctAnswer = selectedTicket[indexTicket].answers.findIndex(obj => obj.isCorrect === true);
    const token = localStorage.getItem('token');
    async function saveTicket() {
        const formData = new FormData(selectedTicketRef.current);

        const res = await fetch('http://147.45.159.11/api/ticketEditor/createQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
            body: {
                ticketId: idSelectedTicket,
                questionId: selectedTicket[indexTicket].qeustionId,
                question: formData.get('questionId'),
                help: formData.get('help'),
                correctAnswer: correctAnswer,
                answers: formData.getAll('answer'),
            },
        });
        const jsonRes = await res.json();
        console.log(jsonRes);
    }

    return (
        <div className={s.wrapperQuestion}>
            <form ref={selectedTicketRef}>
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
                                    questionId={selectedTicket[indexTicket].questionId}
                                    isChecked={i === correctAnswer ? true : ''}
                                />
                            );
                        })}
                    </div>

                    <InputHelp helpText={selectedTicket[indexTicket].help} />
                </div>
            </form>
            <button type='button' onClick={saveTicket} className={s.btn}>
                Сохранить изменения
            </button>
        </div>
    );
}

export default EditQuestion;

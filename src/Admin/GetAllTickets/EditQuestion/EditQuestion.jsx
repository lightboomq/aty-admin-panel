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

        formData.append('ticketId', idSelectedTicket);
        formData.append('questionId', selectedTicket[indexTicket].questionId);
        const arrAnswers = formData.entries('answer');

        console.log(arrAnswers);

        formData.delete(selectedTicket[indexTicket].questionId);

        formData.set('answer', JSON.stringify(arrAnswers));
        formData.append('correctAnswer', correctAnswer);

        // for (const data of formData) {
        //     console.log(data);
        // }
        // const res = await fetch('http://147.45.159.11/api/ticketEditor/editQuestion', {
        //     method: 'PATCH',
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //     },
        //     body: formData,
        // });
        // const jsonRes = await res.json();
        // console.log(jsonRes);
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

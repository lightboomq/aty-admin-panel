import React from 'react';
import logo from '../../../assets/resultExamUser.svg';
import logoClose from '../../../assets/deleteImg.svg';
import s from '../userStyles/getResultUser.module.css';

function GetResultUser({ email }) {
    const [questions, setQuestions] = React.useState([]);
    const [isOpen, setIsOpen] = React.useState(false);

    async function resultExam() {
        const token = localStorage.getItem('token');

        const res = await fetch('http://147.45.159.11/api/userEditor/getExamResult', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                email: email,
            }),
        });
        const jsonQuestions = await res.json();

        setQuestions(jsonQuestions);
        setIsOpen(true);
    }

    function setHighlightAnswers(correctAnswer, userAnswer, i) {
        if (i === correctAnswer && i === userAnswer) return '(Эталон) (Ваш ответ)';
        if (i === correctAnswer) return '(Эталон)';
        if (i === userAnswer) return '(Ваш ответ)';
        return '';
    }

    return (
        <>
            <img src={logo} onClick={resultExam} className={s.logo} alt='resultExam' />
            {isOpen && (
                <div className={s.wrapper}>
                    <div className={s.userExamResult}>
                        <img style={{ cursor: 'pointer' }} src={logoClose} onClick={() => setIsOpen(false)} alt='close' />

                        {questions.map(question => {
                            const correctAnswer = question.answers.findIndex(answer => answer.isCorrect === true);
                            const userAnswer = question.answers.findIndex(answer => answer.answerId === question.userAnswerId);

                            return (
                                <div key={question.questionId} className={s.wrapperQuestion}>
                                    <div className={s.withoutPicture}>Вопрос без рисунка</div>
                                    <h3>{question.question}</h3>

                                    <ol>
                                        {question.answers.map((answer, i) => {
                                            return (
                                                <li key={answer.answerId}>
                                                    {answer.answerText} <span>{setHighlightAnswers(correctAnswer, userAnswer, i)}</span>
                                                </li>
                                            );
                                        })}
                                    </ol>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
}

export default GetResultUser;

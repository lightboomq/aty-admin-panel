import React from 'react';
import s from '../styles/users.module.css';
import logo from '../../../assets/resultExamUser.svg';
import logoClose from '../../../assets/deleteImg.svg';

function GetResultUser({ email }) {
    const [user, setUser] = React.useState([]);
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
        const jsonUser = await res.json();
        setUser(jsonUser);
        setIsOpen(true);
    }

    console.log(user);

    function setHighlightAnswers (correctAnswer, userAnswer, i) {
        if (i === correctAnswer && i === userAnswer) return '(Эталон) (Ваш ответ)';
        if (i === correctAnswer) return '(Эталон)';
        if (i === userAnswer) return '(Ваш ответ)';
        return '';
    }

    return (
        <>
            <img src={logo} onClick={resultExam} className={s.logo} alt='resultExam' />
            {isOpen && (
                <div className={s.userExamResult}>
                    <img style={{ cursor: 'pointer' }} src={logoClose} onClick={() => setIsOpen(false)} alt='close' />
                    {user.map((user, i) => {
                        const correctAnswer = user.answers.findIndex(answer => answer.isCorrect === true);
                        const userAnswer = user.answers.findIndex(answer => answer.answerId === user.userAnswerId);

                        return (
                            <div key={i} className={s.wrapperQuestion}>
                                <div className={s.withoutPicture}>Вопрос без рисунка</div>
                                <h3>{user.question}</h3>
                                <ol>
                                    {user.answers.map((answer, i) => {
                                        return (
                                            <li key={i}>
                                                {answer.answerText} <span>{setHighlightAnswers(correctAnswer, userAnswer, i)}</span>
                                            </li>
                                        );
                                    })}
                                </ol>
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
}

export default GetResultUser;


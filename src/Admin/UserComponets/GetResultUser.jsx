import React from 'react';
import logo from '../../../assets/resultExamUser.svg';
import logoClose from '../../../assets/deleteImg.svg';
import Loader from '../layout/Loader.jsx';
import { userRequests } from '../../API.js';
import s from '../userStyles/getResultUser.module.css';

function GetResultUser({ email, userName, testResult }) {
    const [questions, setQuestions] = React.useState([]);
    const [isOpen, setIsOpen] = React.useState(false);
    const [isLoader, setIsLoader] = React.useState(false);

    function getUserCorrectAnswers(){
        let count = 0;
        
        for(let i=0; i<questions.length; i++){
            const userAnswer = questions[i].userAnswerId;
            for(let j=0; j<questions[i].answers.length; j++){
                if(userAnswer === questions[i].answers[j].answerId && questions[i].answers[j].isCorrect){
                    count++;
                }    
            }
        }
        return `Правильных ответов ${count} из ${questions.length}`;
    }
    
    function setHighlightAnswers(correctAnswer, userAnswer, i) {
        if (i === correctAnswer && i === userAnswer) return <span className={s.green}>(Эталон) (Ваш ответ)</span>;
        if (i === correctAnswer) return <span className={s.green}>(Эталон)</span>;
        if (i === userAnswer) return <span className={s.red}>(Ваш ответ)</span>;
        return '';
    }

    return (
        <>
            <div className={s.wrapperLogoShowResult}>
                {isLoader && <Loader color='blue' />}
                <img
                    src={logo}
                    onClick={() => userRequests.getResultTestUser(email, setIsLoader, setIsOpen, setQuestions)}
                    style={{ cursor: 'pointer', marginLeft: '3px' }}
                    alt='resultExam'
                />
            </div>

            {isOpen && (
                <div className={s.wrapper}>
                    <div className={s.userExamResult}>
                        <div className={s.wrapperLogoClose}>
                            <img className={s.logoClose} src={logoClose} onClick={() => setIsOpen(false)} alt='close' />
                        </div>
                        <h3 className={s.testResult}>{testResult}</h3>
                        <h3 className={s.userName}>{userName}</h3>
                        <h3 className={s.userName}>{getUserCorrectAnswers()}</h3>

                        {questions.map(question => {
                            const correctAnswer = question.answers.findIndex(answer => answer.isCorrect === true);
                            const userAnswer = question.answers.findIndex(answer => answer.answerId === question.userAnswerId);

                            return (
                                <div key={question.questionId} className={s.wrapperQuestion}>
                                    {question.img ? (
                                        <img src={question.img} alt='img' />
                                    ) : (
                                        <div className={s.withoutPicture}>Вопрос без рисунка</div>
                                    )}

                                    <h3 className={s.questionText}>{question.question}</h3>

                                    <ol className={s.wrapperAnswers}>
                                        {question.answers.map((answer, i) => {
                                            return (
                                                <li key={answer.answerId} className={s.answers}>
                                                    {answer.answerText} {setHighlightAnswers(correctAnswer, userAnswer, i)}
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

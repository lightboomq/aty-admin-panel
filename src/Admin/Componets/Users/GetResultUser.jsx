import React from 'react';
import s from '../../styles/users.module.css';
import logo from '../../../../assets/resultExamUser.svg';


function GetResultUser({ email }) {
    const [result, setResult] = React.useState([]);
    const [isOpen, setIsOpen] = React.useState(false);
    

    async function resultExam(e) {
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
        const jsonRes = await res.json();
        setResult(jsonRes);
        
            setIsOpen(true)
        
    }

    

    function test(){
        const totalCorrectAnswer = [];
        const copy = JSON.parse(JSON.stringify(result));
        
        for(let i=0; i<result.length; i++){
            const idAnswer = copy[i].userResultInfo.answerId;
            const correctAnswer = copy[i].questionInfo.answers.findIndex(el=>el.isCorrect === true)
            const userAnswer = copy[i].questionInfo.answers.findIndex(el=>el.answerId === idAnswer)
            
            
            result[i].userResultInfo.isCorrect?totalCorrectAnswer.push(1):totalCorrectAnswer.push(0)
          
           
            
            // console.log(`Картинка ${i+1}`,copy[i].questionInfo.img)
            // console.log(`Вопрос ${i+1}`, copy[i].questionInfo.question)
            // console.log(copy[i].questionInfo.answers)
            for(let j=0; j<copy[i].questionInfo.answers.length; j++){
                copy[i].questionInfo.answers[correctAnswer].correctAnswer = '(Эталон)';
                copy[i].questionInfo.answers[userAnswer].userAnswer = '(Ваш ответ)';
                // console.log(copy[i].questionInfo.answers[j].answerText)
            }
    
            console.log(`
                `)
        }
        const sum = totalCorrectAnswer.reduce((sum, current) => sum + current, 0);
        copy.push({correctAnswer:sum})
       
    }

    test()

    return (
        <>
            <img src={logo} onClick={resultExam} className={s.logo} alt='resultExam' />
            {isOpen && 
                <div className={s.userExamResult}>
                </div>}
        </>
       
    );
}

export default GetResultUser;

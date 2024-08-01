import React from 'react';
import s from '../../styles/users.module.css';
import logo from '../../../../assets/exam.svg';
function SetExamUser({ email, userName, isAppointExam }) {
    async function exam() {
        const action = confirm(isAppointExam ? `Отменить экзамен ${userName}?` : `Назначить экзамен ${userName}?`);
        if (!action) return;
        const token = localStorage.getItem('token');
        
        await fetch('http://147.45.159.11/api/userEditor/appoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                isAppoint: !isAppointExam,
                email: email,
            }),
        });
    }
    return <img onClick={exam} src={logo} alt='exam' className={s.logo} />;
}

export default SetExamUser;

import React from 'react';
import s from '../../styles/users.module.css';
import logo from '../../../../assets/resultExamUser.svg';
;

function GetResultUser({ email }) {
    async function resultExam(e) {
        const token = localStorage.getItem('token');
        const email = e.target.getAttribute('email');
       
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
        
        
    }
    return <img src={logo} email={email} onClick={resultExam} className={s.logo} alt='resultExam' />;
}

export default GetResultUser;

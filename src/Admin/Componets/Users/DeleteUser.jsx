import React from 'react';
import logoMan from '../../../../assets/man.png';
import logoWoman from '../../../../assets/woman.png';
import s from '../../styles/users.module.css';

function DeleteUser({ email, userName, gender }) {
    
    async function deleteUser(e) {
        const action = confirm(`Удалить пользователя ${userName} из базы данных? Все данные будут удалены безвозвратно`);
        if (!action) return;
        const token = localStorage.getItem('token');
        const email = e.target.getAttribute('email');
        await fetch('http://147.45.159.11/api/userEditor/deleteUser', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                email: email,
            }),
        });
    }

    return (
        <img
            onClick={deleteUser}
            email={email}
            className={s.logo}
            alt='logoDelete'
            src={gender[gender.length - 1] === 'а' || gender[gender.length - 1] === 'я' ? logoWoman : logoMan}
        />
    );
}

export default DeleteUser;

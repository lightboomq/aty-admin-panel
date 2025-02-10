import React from 'react';
import logoMan from '../../../assets/man.png';
import logoWoman from '../../../assets/woman.png';
import s from '../userStyles/users.module.css';
import UserStorage from '../../store/UserStorage.js';

function DeleteUser({ email, userName, gender }) {
    async function deleteUser() {
        const isConfirm = confirm(`Удалить пользователя ${userName} из базы данных? Все данные будут удалены безвозвратно`);
        if (!isConfirm) return;

        const token = localStorage.getItem('token');

        await fetch('http://localhost:3333/api/userEditor/deleteUser', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                email: email,
            }),
        });
        UserStorage.deleteUser(email);
    }

    return <img onClick={deleteUser} className={s.logo} alt='logoDelete' src={gender[gender.length - 1] === 'а' ? logoWoman : logoMan} />;
}

export default DeleteUser;

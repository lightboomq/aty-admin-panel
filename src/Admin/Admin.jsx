import React from 'react';
import s from './admin.module.css';
import Header from './Componets/Header.jsx';
import EditTickets from './Componets/EditTickets/EditTickets.jsx';
import User from './Componets/Users/User.jsx';

function Admin() {
    return (
        <div className={s.wrapper}>
            {/* <Header /> */}

            <div className={s.content}>
                <h3 className={s.text}>Редактировать билет</h3>
                <EditTickets />
            </div>

            <div className={s.content}>
                <h3>Пользователи</h3>
                <User />
            </div>
        </div>
    );
}

export default Admin;

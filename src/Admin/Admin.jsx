import React from 'react';
import s from './admin.module.css';
import Header from './Componets/Header.jsx';
import Menu from './Componets/Menu.jsx';
import EditTickets from './Componets/EditTickets/EditTickets.jsx';

import DeleteUsers from './Componets/DeleteUsers.jsx';

function Admin() {
    return (
        <div className={s.wrapper}>
            <Header />
            <Menu />

            <div className={s.content}>
                <h3 className={s.text}>Редактировать билет</h3>
                <EditTickets />
            </div>

            <div className={s.content}>
                <h3>Удалить пользователя из базы данных</h3>
                <DeleteUsers />
            </div>
        </div>
    );
}

export default Admin;

import React from 'react';
import s from './admin.module.css';
import Header from './Header/Header.jsx';
import Menu from './Menu/Menu.jsx';
import GetAllTickets from './GetAllTickets/GetAllTickets.jsx';
import CreateEmptyTicket from './CreateEmptyTicket/CreateEmptyTicket.jsx';
import DeleteTicket from './DeleteTicket/DeleteTicket.jsx';
import DeleteUsers from './DeleteUsers/DeleteUsers.jsx';

function Admin() {
    return (
        <div className={s.wrapper}>
            <Header />
            <Menu />

            {/* <div className={s.content}>
                <h3 className={s.text}>Создать пустой билет</h3>
                <GetAllTickets />
                <CreateEmptyTicket />
            </div> */}

            <div className={s.content}>
                <h3 className={s.text}>Удалить билет</h3>
                <DeleteTicket action = 'deleteTicket'/>
            </div>
















            {/* <div className={s.content}>
                <h3>Удалить пользователя из базы данных</h3>
                <DeleteUsers />
            </div> */}
        </div>
    );
}

export default Admin;

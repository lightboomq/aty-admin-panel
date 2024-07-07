import React from 'react';
import s from './admin.module.css';
import Header from './Header/Header.jsx';
import Menu from './Menu/Menu.jsx';
import CreateEmptyTicket from './CreateEmptyTicket/CreateEmptyTicket.jsx';
import AddQuestionToTicket from './AddQuestionToTicket/AddQuestionToTicket.jsx';
import DeleteUsers from './DeleteUsers/DeleteUsers.jsx';
function Admin() {
    return (
        <div className={s.wrapper}>
            <Header />
            <Menu />

            <div className={s.content}>
                <h3 className={s.text}>Редактирование билетов</h3>
                <CreateEmptyTicket />
            </div>

            <div className={s.content}>
                <h3>Удалить пользователя из базы данных</h3>
                <DeleteUsers />
            </div>
        </div>
    );
}

export default Admin;

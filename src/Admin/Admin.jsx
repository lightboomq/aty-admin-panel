import React from 'react';
import s from './admin.module.css';
import Header from './Componets/Header.jsx';
import EditTickets from './Componets/EditTickets/EditTickets.jsx';
import User from './Componets/Users/User.jsx';
import logoEdit from '../../assets/editTicket.svg'
import logoUsers from '../../assets/users.svg';
function Admin() {
    return (
        <div className={s.wrapper}>
            {/* <Header /> */}

            <div className={s.content}>
                <div className={s.wrapperTitle}>
                    <img src={logoEdit} alt="edit" />
                    <h3 className={s.title}>Редактировать билет</h3>
                </div>
                
                <EditTickets />
            </div>

            <div className={s.content}>
                <div className={s.wrapperTitle}>
                    <img src={logoUsers} alt='users' />
                    <h3 className={s.title}>Пользователи</h3>
                </div>

                <User />
            </div>
        </div>
    );
}

export default Admin;

import React from 'react';
import logoUsers from '../../../assets/users.svg';
import RenderUser from './RenderUser.jsx';
import UserStorage from '../../store/UserStorage.js';
import Loader from '../layout/Loader.jsx';
import { observer } from 'mobx-react-lite';
import s from '../userStyles/users.module.css';

function Users() {
    const [isLoader, setIsLoader] = React.useState(false);
    const users = UserStorage.getAllUsers();

    return (
        <>
            <div className={s.wrapperTitle}>
                <img src={logoUsers} alt='users' />
                <h3 style={{ marginLeft: '10px' }}>Пользователи</h3>
                {isLoader && <Loader color='yellow' />}
            </div>
            <div className={s.wrapper}>
                <RenderUser users={users.filter(user => user.department === '1')} department='1' />

                <RenderUser users={users.filter(user => user.department === '2')} department='2' />

                <RenderUser users={users.filter(user => user.department === '3')} department='3' />

                <RenderUser users={users.filter(user => user.department === '4')} department='4' />

                <RenderUser users={users.filter(user => user.department === '5')} department='5' />
            </div>
        </>
    );
}

export default observer(Users);

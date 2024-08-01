import React from 'react';
import s from '../../styles/users.module.css';
import logoUsers from '../../../../assets/users.svg';
import RenderUser from './RenderUser.jsx';

function Users() {
    const [users, setUsers] = React.useState([]);
    React.useEffect(() => {
        async function getUsers() {
            const token = localStorage.getItem('token');
            const response = await fetch('http://147.45.159.11/api/userEditor/getAllUsers', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const jsonUsers = await response.json();

            setUsers(jsonUsers);
        }
        getUsers();
    }, []);

    return (
        <>
            <div className={s.wrapperTitle}>
                <img src={logoUsers} alt='users' />
                <h3 style={{ marginLeft: '10px' }}>Пользователи</h3>
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

export default Users;

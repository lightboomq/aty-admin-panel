import React from 'react';
import s from '../../styles/users.module.css';
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
        <div className={s.wrapper}>
            <RenderUser users={users.filter(user => user.department === '1' && !user.isAppointExam)} department='1' />

            <RenderUser users={users.filter(user => user.department === '2' && !user.isAppointExam)} department='2' />

            <RenderUser users={users.filter(user => user.department === '3' && !user.isAppointExam)} department='3' />

            <RenderUser users={users.filter(user => user.department === '4' && !user.isAppointExam)} department='4' />

            <RenderUser users={users.filter(user => user.department === '5' && !user.isAppointExam)} department='5' />

            {/* <h3 className={s.wrapperRender}>
                Экзамен назначен
                <RenderUser users={users.filter(user => user.isAppointExam)} />
            </h3> */}

            {/* <h3 className={s.wrapperRender}>Экзамен сдан
                <RenderUser users={users.filter(user=>user.isAppointExam)}/>
            </h3>

            <h3 className={s.wrapperRender}>Экзамен не сдан
                <RenderUser users={users.filter(user=>user.isAppointExam)}/>
            </h3> */}
        </div>
    );
}

export default Users;

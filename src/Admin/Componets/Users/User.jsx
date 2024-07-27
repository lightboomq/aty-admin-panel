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
            console.log(jsonUsers);
            setUsers(jsonUsers);
        }
        getUsers();
    }, []);

    function hidden(e){
        
    }
    return (
        <div className={s.wrapper}>
            <h3 onClick={hidden}  className={s.wrapperRender}>Колонна 1
                <RenderUser users={users.filter(user=>user.department === '1' && !user.isAppointExam)}/>
            </h3>

            <h3 className={s.wrapperRender}>Колонна 2
                <RenderUser users={users.filter(user=>user.department === '2' && !user.isAppointExam)}/>
            </h3>

            <h3 className={s.wrapperRender}>Колонна 3
                <RenderUser users={users.filter(user=>user.department === '3' && !user.isAppointExam)}/>
            </h3>

            <h3 className={s.wrapperRender}>Колонна 4
                <RenderUser users={users.filter(user=>user.department === '4' && !user.isAppointExam)}/>
            </h3 >

            <h3 className={s.wrapperRender}>Колонна 5
                <RenderUser users={users.filter(user=>user.department === '5' && !user.isAppointExam)}/>
            </h3>

            <h3 className={s.wrapperRender}>Экзамен назначен
                <RenderUser users={users.filter(user=>user.isAppointExam)}/>
            </h3>

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

import React from 'react';
import s from '../../styles/users.module.css';
import DeleteUser from './DeleteUser.jsx';
import SetExamUser from './SetExamUser.jsx';
import GetResultUser from './GetResultUser.jsx';
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

    function highlightUser(user, i) {
        if (user.isAppointExam) return `${s.users} ${s.higlightExam}`;
        if (i % 2 === 0) return `${s.users} ${s.higlight}`;
        return s.users;
    }

 
    return (
        
        <div className={s.wrapper}>
           
            {users.map((user, i) => {
                return (
                    <div key={user.email} className={highlightUser(user, i)}>
                        {i + 1}
                        {'.'} {user.firstName} {user.secondName}
                        <div>
                            <GetResultUser email={user.email}   />
                            <SetExamUser
                                email={user.email}
                                isAppointExam={user.isAppointExam}
                                userName={`${user.firstName} ${user.secondName}`}
                            />
                            <DeleteUser email={user.email} woman={user.firstName} userName={`${user.firstName} ${user.secondName}`} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Users;

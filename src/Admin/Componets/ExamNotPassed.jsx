import React from 'react';
import GetResultUser from './GetResultUser.jsx';
import logoUsers from '../../../assets/users.svg';
import logoRepeatExam from '../../../assets/repeatExam.svg';
import SetExamUser from './Users/SetExamUser.jsx';
import s from '../styles/examsUser.module.css';

function ExamNotPassed() {
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        async function getUsers() {
            const token = localStorage.getItem('token');

            const res = await fetch('http://147.45.159.11/api/userEditor/getUsersWithResultExam', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isPassExam: false }),
            });
            const userJson = await res.json();
            
            setUsers(userJson);
        }
        getUsers();
    }, []);

    function getDate(dateExam) {
        const date = new Date(dateExam);
        const day = date.getDate() <= 10 ? `0${date.getDate()}` : date.getDate();
        const mounth = date.getMonth() + 1 <= 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        const year = date.getFullYear();

        const hours = date.getHours()+2 < 10 ? `0${date.getHours()}` : date.getHours();
        const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

        return `${day}.${mounth}.${year} в ${hours+2}:${minutes}`;
    }

    function highlightUser(i) {
        if (i % 2 === 0) return `${s.user} ${s.higlight}`;
        return s.user;
    }
    return (
        <div>
            <div className={s.wrapperTitle}>
                <img src={logoUsers} alt='users' />
                <h3 style={{ marginLeft: '10px' }}>Пользователи</h3>
            </div>

            {users.map((user, i) => {
                return (
                    <div key={user.email} className={highlightUser(i)}>
                        <div className={s.wrapperInfo}>
                            {i + 1}
                            {'.'} {user.firstName} {user.secondName}
                            <p style={{ marginLeft: '10px' }}>{getDate(user.passAt)}</p>
                        </div>
                        <div>
                            <SetExamUser gender={user.secondName} userName={`${user.firstName} ${user.secondName}`} />
                            <GetResultUser email={user.email} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ExamNotPassed;

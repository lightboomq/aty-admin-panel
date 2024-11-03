import React from 'react';
import GetResultUser from './GetResultUser.jsx';
import logoUsers from '../../../assets/users.svg';
import UserStorage from '../../store/UserStorage.js';
import s from '../userStyles/examsUser.module.css';

function ExamPassed() {
    const users = UserStorage.getExamPassedUsers();
    function getDate(dateExam) {
        const date = new Date(dateExam);
        const day = date.getDate() <= 10 ? `0${date.getDate()}` : date.getDate();
        const mounth = date.getMonth() + 1 <= 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        const year = date.getFullYear();

        const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

        return `${day}.${mounth}.${year} в ${hours}:${minutes}`;
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
                {/* {isLoader&& <Loader color='yellow'/>} */}
            </div>

            {users.map((user, i) => {
                return (
                    <div key={user.email} className={highlightUser(i)}>
                        <div className={s.wrapperInfo}>
                            {i + 1}
                            {'.'} {user.firstName} {user.secondName}
                            <p style={{ marginLeft: '10px' }}>{getDate(user.passAt)}</p>
                        </div>
                        <GetResultUser email={user.email} />
                    </div>
                );
            })}
        </div>
    );
}

export default ExamPassed;

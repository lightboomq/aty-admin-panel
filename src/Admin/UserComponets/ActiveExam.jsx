import React from 'react';
import s from '../userStyles/examsUser.module.css';
import logoUsers from '../../../assets/users.svg';
import logoExam from '../../../assets/exam.svg';
import Loader from '../layout/Loader.jsx';
import UserStorage from '../../store/UserStorage.js';
import { observer } from 'mobx-react-lite';
import { userRequests } from '../../API.js';


function ActiveExam() {
    const users = UserStorage.getActiveExamUsers();
    const [isLoader, setIsLoader] = React.useState(false);

    function highlightUser(i) {
        if (i % 2 === 0) return `${s.user} ${s.higlight}`;
        return s.user;
    }

    return (
        <>
            <div className={s.wrapperTitle}>
                <img src={logoUsers} alt='users' />
                <h3 style={{ marginLeft: '10px' }}>Пользователи</h3>
                {isLoader && <Loader color='yellow' />}
            </div>

            {users.map((user, i) => {
                return (
                    <div key={user.email} className={highlightUser(i)}>
                        {i + 1}
                        {'.'} {user.firstName} {user.secondName}
                        <img
                            onClick={() => userRequests.setCanselExamUser(user.email, `${user.firstName} ${user.secondName}`)}
                            src={logoExam}
                            className={s.logo}
                            alt='exam'
                        />
                    </div>
                );
            })}
        </>
    );
}

export default observer(ActiveExam);

import React from 'react';
import s from '../styles/examsUser.module.css';
import logoUsers from '../../../assets/users.svg';
import SetExamUser from './Users/SetExamUser';
function ActiveExam() {
    const [users, setUsers] = React.useState([]);
    const [err, setErr] = React.useState('');

    React.useEffect(() => {
        async function getUsers() {
            const token = localStorage.getItem('token');

            try {
                const res = await fetch('http://147.45.159.11/api/userEditor/getUsersWithAppointExam', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const userJson = await res.json();
                setUsers(userJson);
            } catch (err) {
                setErr(err);
            }
        }
        getUsers();
    }, []);

    function highlightUser(i) {
        if (i % 2 === 0) return `${s.user} ${s.higlight}`;
        return s.user;
    }

    return (
        <>
            <div className={s.wrapperTitle}>
                <img src={logoUsers} alt='users' />
                <h3 style={{ marginLeft: '10px' }}>Пользователи</h3>
            </div>

            {err ? (
                <p className={s.err}>{err}</p>
            ) : (
                users.map((user, i) => {
                    return (
                        <div key={user.email} className={highlightUser(i)}>
                            {i + 1}
                            {'.'} {user.firstName} {user.secondName}
                            <SetExamUser
                                email={user.email}
                                isAppointExam={user.isAppointExam}
                                userName={`${user.firstName} ${user.secondName}`}
                            />
                        </div>
                    );
                })
            )}
        </>
    );
}

export default ActiveExam;

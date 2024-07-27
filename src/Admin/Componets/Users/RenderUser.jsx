import React from 'react';
import s from '../../styles/users.module.css';
import DeleteUser from './DeleteUser.jsx';
import SetExamUser from './SetExamUser.jsx';
import GetResultUser from './GetResultUser.jsx';

function RenderUser({ users }) {
    function highlightUser(isAppointExam, i) {
        if (isAppointExam) return `${s.users} ${s.higlightExam}`;
        if (i % 2 === 0) return `${s.users} ${s.higlight}`;
        return s.users;
    }

    return (
        <>
            {users.length > 0 ? (
                users.map((user, i) => {
                    return (
                        <div key={user.email} className={highlightUser(user.isAppointExam, i)}>
                            {i + 1}
                            {'.'} {user.firstName} {user.secondName}
                            <div>
                                <GetResultUser email={user.email} />
                                <SetExamUser
                                    email={user.email}
                                    isAppointExam={user.isAppointExam}
                                    userName={`${user.firstName} ${user.secondName}`}
                                />
                                <DeleteUser email={users.email} gender={user.firstName} userName={`${user.firstName} ${user.secondName}`} />
                            </div>
                        </div>
                    );
                })
            ) : (
                <p>Список пуст. </p>
            )}
        </>
    );
}

export default RenderUser;
// className={highlightUser(i)

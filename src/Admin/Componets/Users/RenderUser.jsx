import React from 'react';
import s from '../../styles/users.module.css';
import DeleteUser from './DeleteUser.jsx';
import SetExamUser from './SetExamUser.jsx';
import GetResultUser from './GetResultUser.jsx';
import logo from '../../../../assets/arrow.svg';
function RenderUser({ users, department }) {
    const [isOpen, setIsOpen] = React.useState(false);
    
    function highlightUser(isAppointExam, i) {
        if (isAppointExam) return `${s.users} ${s.higlightExam}`;
        if (i % 2 === 0) return `${s.users} ${s.higlight}`;
        return s.users;
    }

    function getOpen() {
        setIsOpen(!isOpen);
    }

    return (
        <div>
            <h3 onClick={getOpen} className={s.title}>
                <img  className={isOpen ? s.logoArrowActive : s.logoArrow} src={logo} alt='arrow' />
                Колона {department}
            </h3>

            <div className={s.test}>
                {isOpen &&
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
                                    <DeleteUser
                                        email={users.email}
                                        gender={user.firstName}
                                        userName={`${user.firstName} ${user.secondName}`}
                                    />
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default RenderUser;

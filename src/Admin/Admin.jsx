import React from 'react';
import s from './admin.module.css';
import Header from './layout/Header.jsx'
import User from './UserComponets/User.jsx';
import ActiveExam from './UserComponets/ActiveExam.jsx';
import ExamPassed from './UserComponets/ExamPassed.jsx';
import ExamNotPassed from './UserComponets/ExamNotPassed.jsx';
import EditTickets from './TicketComponets/EditTickets.jsx';
import { userRequests } from '../API.js';
import UserStorage from '../store/UserStorage.js';
import { observer } from 'mobx-react-lite';

function Admin() {
    const [aciveTab, setActiveTab] = React.useState('users');

    React.useEffect(() => {
        userRequests.getAllUsers();
        userRequests.getUsersWithActiveExam();
        userRequests.getUsersWithResultExam(false);
        userRequests.getUsersWithResultExam(true);
    }, []);

        
    const allUsersCount = UserStorage.getAllUsers().length > 0 ? `(${UserStorage.getAllUsers().length})` : '';
    const usersWidthActiveExamCount = UserStorage.getActiveExamUsers().length > 0 ? `(${UserStorage.getActiveExamUsers().length})` : '';
    const examPassedCount = UserStorage.getExamPassedUsers().length > 0 ? `(${UserStorage.getExamPassedUsers().length})` : '';
    const examNotPassedCount = UserStorage.getExamNotPassedUsers().length > 0 ? `(${UserStorage.getExamNotPassedUsers().length})` : '';
    
    return (
        <div className={s.wrapper}>
            <Header />

            <ol className={s.wrapperMenu}>
                <li className={`${s.menuItem} ${aciveTab === 'users' && s.activeItem}`} onClick={() => setActiveTab('users')}>
                    Пользователи {allUsersCount}
                </li>
                <li className={`${s.menuItem} ${aciveTab === 'activeExam' && s.activeItem}`} onClick={() => setActiveTab('activeExam')}>
                    Назначен экзамен {usersWidthActiveExamCount}
                </li>
                <li className={`${s.menuItem} ${aciveTab === 'examPassed' && s.activeItem}`} onClick={() => setActiveTab('examPassed')}>
                    Экзамен сдали {examPassedCount}
                </li>
                <li
                    className={`${s.menuItem} ${aciveTab === 'examNotPassed' && s.activeItem}`}
                    onClick={() => setActiveTab('examNotPassed')}
                >
                    Экзамен не сдали {examNotPassedCount}
                </li>
                <li
                    className={`${s.menuItem} ${aciveTab === 'editorTickets' && s.activeItem}`}
                    onClick={() => setActiveTab('editorTickets')}
                >
                    Редактор билетов
                </li>
            </ol>

            {aciveTab === 'users' && (
                <div className={s.content}>
                    <User />
                </div>
            )}

            {aciveTab === 'activeExam' && (
                <div className={s.content}>
                    <ActiveExam />
                </div>
            )}

            {aciveTab === 'examPassed' && (
                <div className={s.content}>
                    <ExamPassed />
                </div>
            )}

            {aciveTab === 'examNotPassed' && (
                <div className={s.content}>
                    <ExamNotPassed />
                </div>
            )}

            {aciveTab === 'editorTickets' && (
                <div className={s.content}>
                    <EditTickets />
                </div>
            )}
        </div>
    );
}

export default observer(Admin);

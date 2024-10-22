import React from 'react';
import s from './admin.module.css';
import Header from './Componets/Header.jsx';
import User from './Componets/Users/User.jsx';
import ActiveExam from './Componets/ActiveExam.jsx';
import ExamPassed from './Componets/ExamPassed.jsx';
import ExamNotPassed from './Componets/ExamNotPassed.jsx';
import EditTickets from './Componets/EditTickets/EditTickets.jsx';

function Admin() {
    const [aciveTab, setActiveTab] = React.useState('editorTickets');

    return (
        <div className={s.wrapper}>
            <Header />

            <ol className={s.wrapperMenu}>
                <li className={`${s.menuItem} ${aciveTab === 'users' && s.activeItem}`} onClick={() => setActiveTab('users')}>
                    Пользователи
                </li>
                <li className={`${s.menuItem} ${aciveTab === 'activeExam' && s.activeItem}`} onClick={() => setActiveTab('activeExam')}>
                    Назначен экзамен
                </li>
                <li className={`${s.menuItem} ${aciveTab === 'examPassed' && s.activeItem}`} onClick={() => setActiveTab('examPassed')}>
                    Экзамен сдали
                </li>
                <li
                    className={`${s.menuItem} ${aciveTab === 'examNotPassed' && s.activeItem}`}
                    onClick={() => setActiveTab('examNotPassed')}
                >
                    Экзамен не сдали
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

export default Admin;

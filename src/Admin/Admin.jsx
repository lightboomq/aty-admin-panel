import React from 'react';
import s from './admin.module.css';
import Header from './Componets/Header.jsx';
import User from './Componets/Users/User.jsx';
import ActiveExam from './Componets/ActiveExam.jsx';
import ExamPassed from './Componets/ExamPassed.jsx';
import ExamNotPassed from './Componets/ExamNotPassed.jsx';
import EditTickets from './Componets/EditTickets/EditTickets.jsx';

function Admin() {
    const [isUsers, setIsUsers] = React.useState(false);
    const [isActiveExam, setIsAcitveExam] = React.useState(false);
    const [isExamPassed, setIsExamPassed] = React.useState(false);
    const [isExamNotPassed, setIsExamNotPassed] = React.useState(false);
    const [isEditTickets, setIsEditTickets] = React.useState(true);

    function getItemFromMenu(e) {
        if (e.target.tagName !== 'LI') return;

        const item = e.target.getAttribute('value');

        switch (item) {
            case 'users':
                setIsUsers(true);
                setIsAcitveExam(false);
                setIsExamPassed(false);
                setIsExamNotPassed(false);
                setIsEditTickets(false);
                break;

            case 'exam-active':
                setIsUsers(false);
                setIsAcitveExam(true);
                setIsExamPassed(false);
                setIsExamNotPassed(false);
                setIsEditTickets(false);
                break;

            case 'exam-passed':
                setIsUsers(false);
                setIsAcitveExam(false);
                setIsExamPassed(true);
                setIsExamNotPassed(false);
                setIsEditTickets(false);
                break;

            case 'exam-failed':
                setIsUsers(false);
                setIsAcitveExam(false);
                setIsExamPassed(false);
                setIsExamNotPassed(true);
                setIsEditTickets(false);
                break;

            case 'editor-tickets':
                setIsUsers(false);
                setIsAcitveExam(false);
                setIsExamPassed(false);
                setIsExamNotPassed(false);
                setIsEditTickets(true);
                break;

            default:
                break;
        }
    }

    return (
        <div className={s.wrapper}>
            <Header />

            <ol onClick={getItemFromMenu} className={s.wrapperMenu}>
                <li className={`${s.menuItem} ${isUsers && s.activeItem}`} value='users'>
                    Пользователи
                </li>
                <li className={`${s.menuItem} ${isActiveExam && s.activeItem}`} value='exam-active'>
                    Назначен экзамен
                </li>
                <li className={`${s.menuItem} ${isExamPassed && s.activeItem}`} value='exam-passed'>
                    Экзамен сдали
                </li>
                <li className={`${s.menuItem} ${isExamNotPassed && s.activeItem}`} value='exam-failed'>
                    Экзамен не сдали
                </li>
                <li className={`${s.menuItem} ${isEditTickets && s.activeItem}`} value='editor-tickets'>
                    Редактор билетов
                </li>
            </ol>

            {isUsers && (
                <div className={s.content}>
                    <User />
                </div>
            )}

            {isActiveExam && (
                <div className={s.content}>
                    <ActiveExam />
                </div>
            )}

            {isExamPassed && (
                <div className={s.content}>
                    <ExamPassed />
                </div>
            )}

            {isExamNotPassed && (
                <div className={s.content}>
                    <ExamNotPassed />
                </div>
            )}

            {isEditTickets && (
                <div className={s.content}>
                    <EditTickets />
                </div>
            )}
        </div>
    );
}

export default Admin;

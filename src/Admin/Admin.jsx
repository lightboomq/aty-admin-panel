import React from 'react';
import s from './admin.module.css';
import Header from './Componets/Header.jsx';
import User from './Componets/Users/User.jsx';
import ActiveExam from './Componets/ActiveExam.jsx' 
import EditTickets from './Componets/EditTickets/EditTickets.jsx';



function Admin() {
    const [isUsers, setIsUsers] = React.useState(true);
    const [isActiveExam, setIsAcitveExam] = React.useState(false);
    const [isExamPassed, setIsExamPassed] = React.useState(false);
    const [isExamFailed, setIsExamFailed] = React.useState(false);
    const [isEditTickets, setIsEditTickets] = React.useState(false);

    function getItemFromMenu(e) {
        if (e.target.tagName !== 'LI') return;

        const item = e.target.getAttribute('value');

        switch (item) {
            case 'users':
                setIsUsers(true);
                setIsAcitveExam(false);
                setIsExamPassed(false);
                setIsExamFailed(false);
                setIsEditTickets(false);
                break;

            case 'exam-active':
                setIsUsers(false);
                setIsAcitveExam(true);
                setIsExamPassed(false);
                setIsExamFailed(false);
                setIsEditTickets(false);
                break;

            case 'exam-passed':
                setIsUsers(false);
                setIsAcitveExam(false);
                setIsExamPassed(true);
                setIsExamFailed(false);
                setIsEditTickets(false);
                break;

            case 'exam-failed':
                setIsUsers(false);
                setIsAcitveExam(false);
                setIsExamPassed(false);
                setIsExamFailed(true);
                setIsEditTickets(false);
                break;

            case 'editor-tickets':
                setIsUsers(false);
                setIsAcitveExam(false);
                setIsExamPassed(false);
                setIsExamFailed(false);
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
                <li className={`${s.menuItem} ${isExamFailed && s.activeItem}`} value='exam-failed'>
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

            {isEditTickets && (
                <div className={s.content}>
                    <EditTickets />
                </div>
            )}
        </div>
    );
}

export default Admin;

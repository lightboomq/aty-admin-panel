import React from 'react';
import logo from '../../../assets/exam.svg';
import UserStorage from '../../store/UserStorage';
import { userRequests } from '../../API';
import s from '../userStyles/users.module.css';

function SetExamUser({ email, userName, firstName, secondName }) {
    const refImgHidden = React.useRef(null);
    
    function setExam() {
        userRequests.setExamUser(email, userName);
        UserStorage.setExamUser({ email, firstName, secondName });

        refImgHidden.current.style.display = 'none';
    }

    return <img ref={refImgHidden} onClick={setExam} src={logo} alt='exam' className={s.logo} />;
}

export default SetExamUser;

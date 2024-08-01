import React from 'react';
import s from '../styles/users.module.css';
import logoUsers from '../../../assets/users.svg';

function ActiveExam() {
  
    return (
        <>
            <div className={s.wrapperTitle}>
                <img src={logoUsers} alt='users' />
                <h3 style={{marginLeft:'10px'}}>Пользователи</h3>
            </div>
        </>
    );
}

export default ActiveExam;

import React from 'react';
import s from './modalWindow.module.css';
function ModalWindow({userName,setConfirm,setModal}) {
    
    function confirmDelete(bool) {
        setConfirm(bool);
        setModal(false);
    }
    return (
        <div className={s.wrapper}>
            <div className={s.modalWindow}>
                <h2>Удалить пользователя?</h2>
                <p className={s.userName}>{`${userName.firstName} ${userName.secondName}`}</p>
                <p className={s.userName}>Все данные будут удалены безвозвратно.</p>
                <div className={s.btnModal}>
                    <button onClick={() => confirmDelete(true)} style={{ color: 'green' }} className={s.btn} type='button'>
                        Да
                    </button>
                    <button onClick={() => confirmDelete(false)} style={{ color: 'red' }} className={s.btn} type='button'>
                        Нет
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalWindow;

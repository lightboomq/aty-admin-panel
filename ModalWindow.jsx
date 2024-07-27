import React from 'react';
import s from '../styles/modalWindow.module.css';
function ModalWindow({text,userName,setConfirm,setModal}) {
    
    function confirmDelete(bool) {
        setConfirm(bool);
        setModal(false);
    }
    console.log(text)
    return (
        <div className={s.wrapper}>
            <div className={s.modalWindow}>
                <h2>{text}</h2>
                <p className={s.value}>{userName}</p>
                <p className={s.value}>{text}</p>
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

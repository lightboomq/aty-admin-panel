import React from 'react';
import s from './modalWindow.module.css';
function ModalWindow({value1,value2,setConfirm,setModal}) {
    
    function confirmDelete(bool) {
        setConfirm(bool);
        setModal(false);
    }
    return (
        <div className={s.wrapper}>
            <div className={s.modalWindow}>
                <h2>{value1}</h2>
                <p className={s.value}>{value2}</p>
                <p className={s.value}>Все данные будут удалены безвозвратно.</p>
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

import s from './modalWindow.module.css';


function ModalWindow({ setIsOpenModal, text }) {
   

    return (
        <div className={s.wrapperModalWindow}>
            <div className={s.modalWindow}>
                <p className={s.text}>{text}</p>

                <div className={s.wrapperBtns}>
                    <button onClick={() => setIsOpenModal(true)} className={`${s.btn} ${s.btnYes}`} type='button'>
                        Да
                    </button>

                    <button onClick={() => setIsOpenModal(false)} className={`${s.btn} ${s.btnNo}`} type='button'>
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalWindow;

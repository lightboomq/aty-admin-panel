import React from 'react';
import { ticketRequests } from '../../API';
import DragAndDrop from './DragAndDrop';
import Errors from '../../store/Errors';
import logoDeleteImg from '../../../assets/deleteImg.svg';
import Loader from '../layout/Loader.jsx'
import s from '../ticketStyles/addQuestion.module.css';
import { observer } from 'mobx-react-lite';

function AddQuestion({ idSelectedTicket, lengthTicket, setLengthTicket, setIsNotification }) {

    const [isLoading, setIsLoading] = React.useState(false);
    const [imgSrc, setImgSrc] = React.useState('');
    const [inputCount, setInputCount] = React.useState([0, 1]);
    const imgRef = React.useRef(null);
    const fileInputRef = React.useRef(null);

    const createInput = () => {
        if (inputCount.length > 4) return;
        setInputCount([...inputCount, inputCount[inputCount.length - 1] + 1]); // для key
    };
    const deleteInput = () => {
        if (inputCount.length === 2) return;
        const updateState = inputCount.slice(0, inputCount.length - 1);
        setInputCount(updateState);
    };

    const inputFile = e => {
        const file = e.target.files[0];
        if (!file.type.startsWith('image/')) {
            Errors.setMessage('Выберите изображение');
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => setImgSrc(e.target.result);
    };

    const openFullScreenImg = () => {
        if (imgRef.current.requestFullscreen) {
            return imgRef.current.requestFullscreen();
        }
        if (imgRef.current.mozRequestFullScreen) {
            // Для Firefox
            return imgRef.current.mozRequestFullScreen();
        }
        if (imgRef.current.webkitRequestFullscreen) {
            // Для Safari
            return imgRef.current.webkitRequestFullscreen();
        }
        // Для IE/Edge
        return imgRef.current.msRequestFullscreen();
    };

    return (
        <form
            onSubmit={e => ticketRequests.addQuestion(e, idSelectedTicket, lengthTicket, setLengthTicket, setImgSrc, setIsNotification, setIsLoading)}
            className={s.wrapper}
        >
            <h4>{`Вопрос: ${lengthTicket}`}</h4>

            {imgSrc ? (
                <div className={s.wrapperImg}>
                    <img className={s.picture} onClick={openFullScreenImg} src={imgSrc} ref={imgRef} alt='' />
                    <img className={s.logoDeleteImg} onClick={() => setImgSrc('')} src={logoDeleteImg} alt='logoDeleteImg' />
                </div>
            ) : (
                <DragAndDrop fileInputRef={fileInputRef} setImgSrc={setImgSrc} />
            )}

            <input type='file' name='img' className={s.inputFile} ref={fileInputRef} onChange={inputFile} accept='image/*' />

            <div className={s.wrapperInput}>
                <div style={{ color: 'blue', fontSize: '24px' }}>*</div>
                <textarea type='text' name='question' className={s.textarea} placeholder='Введите вопрос (обязательное поле)' />
            </div>

            {inputCount.map((el, i) => {
                return (
                    <div className={s.wrapperInput} key={el}>
                        <div className={s.requiredInput}>*</div>
                        <input type='text' name='answers' className={s.inputAnswer} placeholder='Введите ответ (обязательное поле)' />

                        <button onClick={deleteInput} type='button' className={s.deleteInputBtn}>
                            -
                        </button>

                        <input type='radio' name='correctAnswer' value={i} className={s.radioBtn} />
                    </div>
                );
            })}

            <button onClick={createInput} type='button' className={s.createInputBtn}>
                Добавить поле
            </button>
            
            <div className={s.wrapperInput}>
                <textarea type='text' name='help' className={`${s.textarea} ${s.helpBtn}`} placeholder='Введите комментарий к вопросу' />
            </div>

            <div className={s.wrapperBtn}>
                <button type='submit' className={s.saveBtn}>
                    Сохранить
                </button>
                {isLoading && <Loader color='gray' width={20} height={20} positionLeft={140}/>}
                <h4 className={s.errors}>{Errors.getMessage()}</h4>
            </div>
        </form>
    );
}

export default observer(AddQuestion);

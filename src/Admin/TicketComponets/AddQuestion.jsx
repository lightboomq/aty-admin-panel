import React from 'react';
import { ticketRequests } from '../../API';
import Errors from '../../store/Errors';
import logoDeleteImg from '../../../assets/deleteImg.svg';
import gif from '../../../assets/check.gif';
import s from '../ticketStyles/addQuestion.module.css';
import { observer } from 'mobx-react-lite';

function AddQuestion({ idSelectedTicket, lengthTicket, setLengthTicket }) {
    const [imgSrc, setImgSrc] = React.useState('');
    const [inputCount, setInputCount] = React.useState([0, 1]);
    const [isGif, setIsGif] = React.useState(false);
    const dropZoneRef = React.useRef(null);
    const fileInputRef = React.useRef(null);

    const createInput = () => {
        if (inputCount.length > 4) return;
        setInputCount([...inputCount, inputCount[inputCount.length - 1] + 1]); // для key 54 строка
    };
    const deleteInput = () => {
        if (inputCount.length === 2) return;
        const updateState = inputCount.slice(0, inputCount.length - 1);
        setInputCount(updateState);
    };

    const dropZoneDragOver = e => {
        e.preventDefault();
        dropZoneRef.current.style.border = '2px dashed black';
    };
    const dropZoneDragLeave = e => {
        e.preventDefault();
        dropZoneRef.current.style.border = '2px dashed #ccc';
    };
    const dropZoneDrop = e => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        console.log(file)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
            setImgSrc(e.target.result);
        };
    };
    const inputFile = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => setImgSrc(e.target.result);
    };

    return (
        <form
            onSubmit={e => ticketRequests.addQuestion(e, idSelectedTicket, lengthTicket, setLengthTicket, setIsGif, setImgSrc)}
            className={s.wrapper}
        >
            <h4>{`Вопрос: ${lengthTicket}`}</h4>
            {imgSrc ? (
                <div className={s.wrapperImg}>
                    <img className={s.picture} src={imgSrc} alt='' />
                    <img className={s.logoDeleteImg} onClick={() => setImgSrc('')} src={logoDeleteImg} alt='logoDeleteImg' />
                </div>
            ) : (
                <div
                    className={s.dropZone}
                    ref={dropZoneRef}
                    onDragOver={dropZoneDragOver}
                    onDragLeave={dropZoneDragLeave}
                    onDrop={dropZoneDrop}
                    onClick={() => fileInputRef.current.click()}
                    name='img'
                >
                    Нажмите или перетащите изображение сюда
                </div>
            )}
            <input type='file' name='img' className={s.inputFile} ref={fileInputRef} onChange={inputFile} />

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
                {isGif && <img className={s.gif} src={gif} alt='gif' />}
                <h4 className={s.errors}>{Errors.getMessage()}</h4>
            </div>
        </form>
    );
}

export default observer(AddQuestion);

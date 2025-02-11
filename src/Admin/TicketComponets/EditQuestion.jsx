import React from 'react';
import { ticketRequests } from '../../API.js';
import DragAndDrop from './DragAndDrop.jsx';
import Errors from '../../store/Errors.js';
import gif from '../../../assets/check.gif';
import logoDeleteImg from '../../../assets/deleteImg.svg';
import InputQuestion from './InputQuestion.jsx';
import InputAnswer from './InputAnswer.jsx';
import InputHelp from './InputHelp.jsx';
import s from '../ticketStyles/editQuestion.module.css';
import { observer } from 'mobx-react-lite';

function EditQuestion({ states }) {
    const [isImg, setIsImg] = React.useState(false);
    const [imgSrc, setImgSrc] = React.useState(states.selectedQuestion.img);
    const [isGifSave, setIsGifSave] = React.useState(false);
    const [isGifDelete, setIsGifDelete] = React.useState(false);
    const selectedQuestion = states.selectedQuestion;
    const correctAnswer = selectedQuestion.answers.findIndex(obj => obj.isCorrect === true);
    const imgRef = React.useRef(null);
    const fileInputRef = React.useRef(null);


    const getClearInputFile = () => {
        fileInputRef.current.value = '';
        setIsImg(true);
        setImgSrc(null);
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
        <div className={s.wrapper}>
            <form onSubmit={e => ticketRequests.saveQuestion(e, { ...states }, isImg, setIsGifSave, setIsImg)}>
                <div key={selectedQuestion.questionId}>
                    {imgSrc ? (
                        <div className={s.wrapperImg}>
                            <img className={s.picture} ref={imgRef} onClick={openFullScreenImg} src={imgSrc} alt='Обновите страницу' />
                            <img className={s.logoDeleteImg} onClick={getClearInputFile} src={logoDeleteImg} alt='logoDeleteImg' />
                        </div>
                    ) : (
                        <DragAndDrop fileInputRef={fileInputRef} setImgSrc={setImgSrc} />
                    )}

                    <input className={s.inputFile} ref={fileInputRef} onChange={inputFile} name='img' type='file' />

                    <InputQuestion question={selectedQuestion.question} />

                    <div>
                        {selectedQuestion.answers.map((answer, i) => {
                            return (
                                <InputAnswer
                                    key={`${answer}${i + 1}`}
                                    answerText={answer.answerText}
                                    correctAnswer={correctAnswer}
                                    isChecked={i === correctAnswer ? true : ''}
                                    i={i}
                                />
                            );
                        })}
                    </div>

                    <InputHelp helpText={selectedQuestion.help} />
                </div>

                <div className={s.wrapperBtns}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <button type='submit' className={s.btn}>
                            Сохранить изменения
                        </button>
                        {isGifSave && <img className={s.gif} src={gif} alt='gif' />}
                    </div>

                    <h4 className={s.errors}>{Errors.getMessage()}</h4>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {isGifDelete && <img style={{ marginRight: '10px' }} width={25} height={25} src={gif} alt='gif' />}
                        <button
                            type='button'
                            onClick={() => ticketRequests.deleteQuestion({ ...states }, setIsGifDelete)}
                            className={s.btn}
                        >
                            Удалить вопрос
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default observer(EditQuestion);

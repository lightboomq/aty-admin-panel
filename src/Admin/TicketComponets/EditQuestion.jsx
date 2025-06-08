import React from 'react';
import { ticketRequests } from '../../API.js';
import DragAndDrop from './DragAndDrop.jsx';
import Errors from '../../store/Errors.js';
import logoDeleteImg from '../../../assets/deleteImg.svg';
import InputQuestion from './InputQuestion.jsx';
import InputAnswer from './InputAnswer.jsx';
import InputHelp from './InputHelp.jsx';
import Loader from '../layout/Loader.jsx';
import { observer } from 'mobx-react-lite';
import s from '../ticketStyles/editQuestion.module.css';

function EditQuestion({ numberQuestion, setNumberQuestion, idSelectedTicket, selectedQuestion, setIsNotification, refOption, setSelectedTicket, selectedTicket, setSelectedQuestion,setLengthTicket }) {


    if (Object.keys(selectedQuestion).length === 0) { //Выход из функций после удаления единственного вопроса в билете.
        refOption.current.textContent = 'Выберите операцию'
        return null;
    }

    const [isImg, setIsImg] = React.useState(false);
    const [imgSrc, setImgSrc] = React.useState(selectedQuestion.img);
    const [isLoadingSave, setIsLoadingSave] = React.useState(false);
    const [isLoadingDelete, setIsLoadingDelete] = React.useState(false);
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
            <form onSubmit={e => ticketRequests.saveQuestion(e, idSelectedTicket, selectedQuestion, setIsNotification, isImg, setIsImg, setIsLoadingSave)}>
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
                        {isLoadingSave && <Loader color='gray' width={20} height={20} positionLeft={170} />}
                    </div>

                    <h4 className={s.errors}>{Errors.getMessage()}</h4>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {isLoadingDelete && <Loader color='gray' width={20} height={20} positionRight={135} />}
                        <button
                            type='button'
                            onClick={() => ticketRequests.deleteQuestion(
                                idSelectedTicket,
                                numberQuestion,
                                setNumberQuestion,
                                selectedQuestion,
                                setIsNotification,
                                refOption,
                                setSelectedTicket,
                                selectedTicket,
                                setSelectedQuestion,
                                setIsLoadingDelete,
                                setLengthTicket
                            )}
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

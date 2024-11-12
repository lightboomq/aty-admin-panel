import React from 'react';
import { ticketRequests } from '../../API.js';
import gif from '../../../assets/check.gif';
import logoDeleteImg from '../../../assets/deleteImg.svg';
import InputQuestion from './InputQuestion.jsx';
import InputAnswer from './InputAnswer.jsx';
import InputHelp from './InputHelp.jsx';
import s from '../ticketStyles/editQuestion.module.css';

function EditQuestion({
    setSelectedQuestion,
    selectedQuestion,
    idSelectedTicket,
    selectedTicket,
    setSelectedTicket,
    numberQuestion,
    setNumberQuestion,
    refOption,
}) {
    const [isImg, setIsImg] = React.useState(false);
    const [imgSrc, setImgSrc] = React.useState(selectedQuestion.img);
    const [isGifSave, setIsGifSave] = React.useState(false);
    const [isGifDelete, setIsGifDelete] = React.useState(false);

    const correctAnswer = selectedQuestion.answers.findIndex(obj => obj.isCorrect === true);

    const ref = React.useRef(null);

    function getClearInputFile() {
        ref.current.value = '';
        setIsImg(true);
        setImgSrc(null);
    }
    return (
        <div className={s.wrapper}>
            <form onSubmit={e => ticketRequests.saveQuestion(e, idSelectedTicket, selectedQuestion, isImg, setIsGifSave, setIsImg)}>
                <div key={selectedQuestion.questionId}>
                    {imgSrc ? (
                        <div className={s.wrapperImg}>
                            <img className={s.picture} src={imgSrc} alt='Обновите страницу' />
                            <img className={s.logoDeleteImg} onClick={getClearInputFile} src={logoDeleteImg} alt='logoDeleteImg' />
                        </div>
                    ) : (
                        <div className={`${s.withoutPicture} `}>Вопрос без рисунка</div>
                    )}

                    <input
                        ref={ref}
                        onInput={event => {
                            const file = event.target.files[0];
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = e => {
                                setImgSrc(e.target.result);
                            };
                        }}
                        name='img'
                        type='file'
                    />

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

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {isGifDelete && <img style={{ marginRight: '10px' }} width={25} height={25} src={gif} alt='gif' />}
                        <button
                            type='button'
                            onClick={() =>
                                ticketRequests.deleteQuestion(
                                    idSelectedTicket,
                                    selectedQuestion.questionId,
                                    setSelectedTicket,
                                    numberQuestion,
                                    selectedTicket,
                                    setSelectedQuestion,
                                    setNumberQuestion,
                                    refOption,
                                    setIsGifDelete,
                                )
                            }
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

export default EditQuestion;

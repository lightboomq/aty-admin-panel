import React from 'react';
import gif from '../../../assets/check.gif';
import logoDeleteImg from '../../../assets/deleteImg.svg';
import InputQuestion from './InputQuestion.jsx';
import InputAnswer from './InputAnswer.jsx';
import InputHelp from './InputHelp.jsx';
import DeleteQuestion from './DeleteQuestion.jsx';
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
    const [isGif, setIsGif] = React.useState(false);
    const correctAnswer = selectedQuestion.answers.findIndex(obj => obj.isCorrect === true);
    const token = localStorage.getItem('token');
    const ref = React.useRef(null);

    async function saveTicket(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        if (isImg) formData.delete('img');

        formData.append('ticketId', idSelectedTicket);
        formData.append('questionId', selectedQuestion.questionId);

        const res = await fetch('http://147.45.159.11/api/ticketEditor/editQuestion', {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });
        setIsGif(true);

        if (res.ok) {
            setTimeout(() => {
                setIsGif(false);
                setIsImg(false);
            }, 1250);
        }
    }

    function getClearInputFile() {
        ref.current.value = '';
        setIsImg(true);
        setImgSrc(null);
    }
    return (
        <div className={s.wrapper}>
            <form onSubmit={saveTicket}>
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
                        {isGif && <img className={s.gif} src={gif} alt='gif' />}
                    </div>

                    <DeleteQuestion
                        setSelectedTicket={setSelectedTicket}
                        idSelectedTicket={idSelectedTicket}
                        questionId={selectedQuestion.questionId}
                        numberQuestion={numberQuestion}
                        selectedTicket={selectedTicket}
                        setSelectedQuestion={setSelectedQuestion}
                        setNumberQuestion={setNumberQuestion}
                        refOption={refOption}
                    />
                </div>
            </form>
        </div>
    );
}

export default EditQuestion;

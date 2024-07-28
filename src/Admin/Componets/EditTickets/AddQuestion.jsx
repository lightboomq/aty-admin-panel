import React from 'react';
import s from '../../styles/EditTickets/addQuestion.module.css';
import gif from '../../../../assets/check.gif';
function AddQuestion({ idSelectedTicket, lengthTicket, setLengthTicket }) {
    const [inputCount, setInputCount] = React.useState([0, 1]);
    const [isGif, setIsGif] = React.useState(false);

    function createInput() {
        if (inputCount.length > 4) return false;
        setInputCount([...inputCount, inputCount[inputCount.length - 1] + 1]); // для key 54 строка
    }

    function deleteInput() {
        if (inputCount.length === 2) return false;
        const updateState = inputCount.slice(0, inputCount.length - 1);
        setInputCount(updateState);
    }

    async function saveQuestion(e) {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const form = new FormData(e.target);

        form.append('ticketId', idSelectedTicket);

        const res = await fetch('http://147.45.159.11/api/ticketEditor/createQuestion', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: form,
        });

        if (res.ok) {
            setIsGif(true);
            const timerId = setTimeout(() => {
                setLengthTicket(lengthTicket + 1);
                e.target.reset();
                setIsGif(false);
                clearTimeout(timerId);
            }, 1250);
        }
    }

    return (
        <form onSubmit={saveQuestion} className={s.wrapper}>
            <h4 className={s.numberQuestion}>{`Вопрос: ${lengthTicket}`}</h4>

            <input className={s.inputFile} type='file' name='img' accept='image/*' />

            <div className={s.wrapperInput}>
                <div className={s.requiredInput}>*</div>
                <textarea type='text' name='question' className={s.textarea} placeholder='Введите вопрос(обязательное поле)' />
            </div>

            {inputCount.map((el, i) => {
                return (
                    <div className={s.wrapperInput} key={el}>
                        <div className={s.requiredInput}>*</div>
                        <input type='text' name='answers' className={s.inputAnswer} placeholder='Введите ответ(обязательное поле)' />

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
            </div>
        </form>
    );
}

export default AddQuestion;

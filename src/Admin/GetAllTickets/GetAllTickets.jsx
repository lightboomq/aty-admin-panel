import React from 'react';
import s from './getAllTickets.module.css';
import Loader from '../Loader/Loader.jsx';
import InputQuestion from './EditInputs/InputQuestion.jsx';
import InputAnswer from './EditInputs/InputAnswer.jsx';
import InputHelp from './EditInputs/InputHelp.jsx';
function GetAllTickets() {
    const token = localStorage.getItem('token');
    const [allTickets, setAllTickets] = React.useState([]);

    const [selectedTicket, setSelectedTicket] = React.useState([]);
    const [idSelectedTicket, setIdSelectedTicket] = React.useState('');
    const [idSelectedQuestion, setIdSelectedQuestion] = React.useState([]);

    async function saveTicket() {
        const form = selectedTicketRef.current;

        
        const arr = []
        arr.push(form.elements[1].textContent)
        arr.push(form.elements[3].textContent)
        arr.push(form.elements[5].textContent)
        console.log(form.elements[5].textContent)
        // const res = await fetch('http://147.45.159.11/api/ticketEditor/editQuestion', {
        //     method: 'PATH',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Authorization: `Bearer ${token}`,
        //     },
        //     body: JSON.stringify({
        //         ticketId: idSelectedTicket,+
        //         questionId: idQuestion,+
        //         question:form[0].textContent,+
        //         help:form.elements[7].textContent
        //         correctAnswer: correctAnswer,
        //         answers: arr, +
        //     }),
        // });
        
    }

    React.useEffect(() => {
        async function getTickets() {
            const response = await fetch('http://147.45.159.11/api/ticketEditor/tickets', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const jsonAllTickets = await response.json();
            setAllTickets(jsonAllTickets);
        }
        getTickets();
    }, [token]);

    const [idQuestions, setIdQuestions] = React.useState([]);
    async function getTicket(e) {
        const ticketId = e.target.getAttribute('ticketid');

        const res = await fetch('http://147.45.159.11/api/ticketEditor/getQuestions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                ticketId: ticketId,
            }),
        });
        const jsonTicket = await res.json();
        setSelectedTicket(jsonTicket);
        setIdSelectedTicket(ticketId);
        //setIdQuestions(shapes)
    }

    function save(e) {
        // const questionId = e.target.getAttribute('questionid');
        // console.log(e.target.textContent);
        // console.log('ticketId: ', idSelectedTicket);
        // console.log('questionId: ', questionId);
    }
    function highlight(ticket, idSelectedTicket) {
        if (idSelectedTicket === ticket.ticketId) return `${s.ticketCard} ${s.ticketCardActive}`;
        return s.ticketCard;
    }

    const selectedTicketRef = React.useRef(null);

    return (
        <>
            <div className={s.wrapper}>
                {allTickets.map((ticket, i) => {
                    return (
                        <div
                            key={ticket.ticketId}
                            onClick={getTicket}
                            ticketid={ticket.ticketId}
                            className={highlight(ticket, idSelectedTicket)}
                        >
                            {i + 1}
                        </div>
                    );
                })}
            </div>

            <div className={s.wrapperTicket}>
                <button onClick={saveTicket} type='button'>
                    Сохранить
                </button>
                <form ref={selectedTicketRef}>
                    {selectedTicket.map(item => {
                        const correctAnswer = item.answers.findIndex(obj => obj.isCorrect === true);

                        return (
                            <div key={item.questionId} onClick={save} className={s.wrapperQuestion}>
                                {item.img ? (
                                    <img className={s.picture} src={item.img} alt='' />
                                ) : (
                                    <div className={`${s.withoutPicture} `}>Вопрос без рисунка</div>
                                )}

                                <InputQuestion question={item.question} />

                                <div>
                                    {item.answers.map((answer, i) => {
                                        return (
                                            <InputAnswer
                                                key={`${answer}${i + 1}`}
                                                answerText={answer.answerText}
                                                i={i}
                                                questionId={item.questionId}
                                                checked={i === correctAnswer ? true : ''}
                                            />
                                        );
                                    })}
                                </div>

                                <InputHelp helpText={item.help} />
                            </div>
                        );
                    })}
                </form>
            </div>
        </>
    );
}

export default GetAllTickets;
// const nodes = ticketRef.current.childNodes;
// const arr = selectedTicket.map(item => item.questionId);
// console.log(arr);
// console.log(nodes[1].childNodes[1].textContent);

// for (let i = 0; i < nodes.length - 1; i++) {
//     console.log(nodes[i].childNodes[1].textContent);
// }

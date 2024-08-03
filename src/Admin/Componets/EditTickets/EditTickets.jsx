import React from 'react';
import s from '../../styles/EditTickets/editTickets.module.css';
import logoEdit from '../../../../assets/editTicket.svg';
import Loader from '../Loader.jsx';
import CreateTicket from './CreateEmptyTicket.jsx';
import EditQuestion from './EditQuestion/EditQuestion.jsx';
import AddQuestion from './AddQuestion.jsx';
import DeleteTicket from './DeleteTicket.js';

function EditTickets() {
    const token = localStorage.getItem('token');
    const selectRef = React.useRef(null);
    const [allTickets, setAllTickets] = React.useState([]);
    const [selectedTicket, setSelectedTicket] = React.useState([]);
    const [lengthTicket, setLengthTicket] = React.useState(null);
    const [idSelectedTicket, setIdSelectedTicket] = React.useState('');
    const [indexTicket, setIndexTicket] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isTagSelect, setIsTagSelect] = React.useState(false);
    const [isEditQuestion, setIsEditQuestion] = React.useState(false);
    const [isAddQuestion, setIsAddQuestion] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState('Выберите операцию');

   
    const [isImg, setIsImg] = React.useState(false);


    
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

    async function getTicket(e) {
        const ticketId = e.target.getAttribute('ticketid');
        setIndexTicket(Number(e.target.textContent) - 1);
        setIsLoading(true);
        setIsTagSelect(false);
        setIsEditQuestion(false);
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
        setIsLoading(false);
        setSelectedTicket(jsonTicket);
        setIdSelectedTicket(ticketId);
        setIsTagSelect(true);
        setLengthTicket(jsonTicket.length + 1);
    }
 
    function getSelect() {
        const select = selectRef.current.value;
        const number = Number.parseInt(select.match(/\d+/));

        switch (select) {
            case `changeQuestion ${number}`:
                setIsEditQuestion(true);
                setIsAddQuestion(false);
                setIndexTicket(number - 1);
                setSelectedValue('Выберите операцию');
                setIsImg(false)
                break;

            case 'addQuestion':
                setIsEditQuestion(false);
                setIsAddQuestion(true);
                setIndexTicket(number - 1);
                setSelectedValue('Добавить вопрос в билет');
                setIsImg(false)
                break;

            case 'deleteTicket':
                DeleteTicket(idSelectedTicket);
                setSelectedValue('Выберите операцию');
                setIsImg(false)
                break;
            default:
                break;
        }
    }

  
    function highlight(ticket, idSelectedTicket) {
        if (idSelectedTicket === ticket.ticketId && isTagSelect) return `${s.ticketCard} ${s.ticketCardActive}`;
        return s.ticketCard;
    }
    console.log(indexTicket)
    return (
        <>
            <div className={s.wrapperTitle}>
                <img src={logoEdit} alt='edit' />
                <h3 style={{ marginLeft: '10px' }}>Редактировать билет</h3>
            </div>
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
                            {i === indexTicket && isLoading ? <Loader /> : ''}
                        </div>
                    );
                })}
                <CreateTicket />
            </div>

            {isTagSelect && (
                <div>
                    <select ref={selectRef} onChange={getSelect}>
                        <option hidden value=''>
                            {selectedValue}
                        </option>

                        {selectedTicket.map((number, i) => {
                            return <option key={number.questionId} value={`changeQuestion ${i + 1}`}>{`Изменить вопрос: ${i + 1}`}</option>;
                        })}

                        {selectedValue !== 'Добавить вопрос в билет' && <option value='addQuestion'>Добавить вопрос в билет </option>}
                        <option value='deleteTicket'>Удалить билет </option>
                    </select>
                </div>
            )}

            {isEditQuestion && (
                <EditQuestion
                    key={indexTicket}
                    selectedTicket={selectedTicket}
                    indexTicket={indexTicket}
                    idSelectedTicket={idSelectedTicket}
                    setIsEditQuestion={setIsEditQuestion}
                    isImg={isImg}
                    setIsImg={setIsImg}
                />
            )}

            {isAddQuestion && (
                <AddQuestion key={indexTicket} idSelectedTicket={idSelectedTicket} lengthTicket={lengthTicket} setLengthTicket={setLengthTicket} />
            )}
        </>
    );
}

export default EditTickets;

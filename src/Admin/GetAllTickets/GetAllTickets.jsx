import React from 'react';
import s from './getAllTickets.module.css';
import Loader from '../Loader/Loader.jsx';
import EditQuestion from './EditQuestion/EditQuestion.jsx';
function GetAllTickets() {
    const token = localStorage.getItem('token');
    const [isLoading, setIsLoading] = React.useState(false);
    const [allTickets, setAllTickets] = React.useState([]);
    const [selectedTicket, setSelectedTicket] = React.useState([]);
    const [idSelectedTicket, setIdSelectedTicket] = React.useState('');
    const [isTagSelect, setIsTagSelect] = React.useState(false);
    const [isEditQuestion, setIsEditQuestion] = React.useState(false);
    const [indexTicket, setIndexTicket] = React.useState(null);
    const selectedTicketRef = React.useRef(null);
    const selectRef = React.useRef(null);

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

 

    function getSelect() {
        const select = selectRef.current.value;
        const number = parseInt(select.match(/\d+/));

        switch (select) {
            case `changeQuestion ${number}`:
                setIsEditQuestion(true);
                setIndexTicket(number - 1);
                break;
            case 'addQuestion':
                console.log('addQuestion');
                break;
            default:
                break;
        }
    }

    function highlight(ticket, idSelectedTicket) {
        if (idSelectedTicket === ticket.ticketId && isTagSelect) return `${s.ticketCard} ${s.ticketCardActive}`;
        return s.ticketCard;
    }
 
    async function getTicket(e) {
        const ticketId = e.target.getAttribute('ticketid');
        setIndexTicket(Number(e.target.textContent) - 1);
        setIsLoading(true);
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
        
    }

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
                            {i === indexTicket && isLoading ? <Loader />  : ''}
                            
                        </div>
                    ); 
                })}
            </div>
            {isTagSelect && (
                <div>
                    <select ref={selectRef} onChange={getSelect}>
                        <option value=''>Выберите операцию </option>
                        {selectedTicket.map((number, i) => {
                            return <option key={number.questionId} value={`changeQuestion ${i + 1}`}>{`Изменить вопрос: ${i + 1}`}</option>;
                        })}

                        <option value='addQuestion'>Добавить вопрос в билет </option>
                    </select>
                </div>
            )}

            <div className={s.wrapperTicket}>
                {isEditQuestion && (
                    <EditQuestion
                        selectedTicket={selectedTicket}
                        indexTicket={indexTicket}
                        idSelectedTicket={idSelectedTicket}
                        selectedTicketRef={selectedTicketRef}
                    />
                )}
            </div>
        </>
    );
}

export default GetAllTickets;

import React from 'react';
import { ticketRequests } from '../../API.js';
import Notification from '../layout/Notification.jsx';
import logoEdit from '../../../assets/editTicket.svg';
import Loader from '../layout/Loader.jsx';
import CreateEmptyTicket from './CreateEmptyTicket.jsx';
import EditQuestion from './EditQuestion.jsx';
import AddQuestion from './AddQuestion.jsx';
import DeleteTicket from './DeleteTicket.jsx';
import s from '../ticketStyles/editTickets.module.css';

function EditTickets() {
    const selectRef = React.useRef(null);
    const [allTickets, setAllTickets] = React.useState([]);
    const [selectedTicket, setSelectedTicket] = React.useState([]);
    const [lengthTicket, setLengthTicket] = React.useState(null);
    const [idSelectedTicket, setIdSelectedTicket] = React.useState('');
    const [indexTicket, setIndexTicket] = React.useState(null);
    const [selectedOption, setSelectedOption] = React.useState('');
    const [numberQuestion, setNumberQuestion] = React.useState(null);
    const [selectedQuestion, setSelectedQuestion] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(false);
    const [isTagSelect, setIsTagSelect] = React.useState(false);
    const [isNotification, setIsNotification] = React.useState(false);
    const refOption = React.useRef(null);

    const states = {
        allTickets,
        selectedTicket,
        lengthTicket,
        idSelectedTicket,
        indexTicket,
        selectedOption,
        numberQuestion,
        selectedQuestion,
        isLoading,
        isTagSelect,
        isNotification,
        setAllTickets,
        setSelectedTicket,
        setLengthTicket,
        setIdSelectedTicket,
        setIndexTicket,
        setSelectedOption,
        setNumberQuestion,
        setSelectedQuestion,
        setIsLoading,
        setIsTagSelect,
        refOption,
        setIsNotification
    };

    React.useEffect(() => {
        ticketRequests.getAllTickets(setAllTickets);
    }, []);

    function getOption() {
    
        if (selectRef.current.value === 'Добавить вопрос') return setSelectedOption('Добавить вопрос');

        const indexQestion = Number(selectRef.current.value.slice(-2)) - 1;
        setSelectedOption('Изменить вопрос');
        setNumberQuestion(indexQestion);
        setSelectedQuestion(selectedTicket[indexQestion]);
    }

    function highlight(ticketId, idSelectedTicket) {
        if (idSelectedTicket === ticketId && isTagSelect) return `${s.ticketCard} ${s.ticketCardActive}`;
        return s.ticketCard;
    }

    return (
        <>
            <div className={s.wrapperTitle}>
                <img src={logoEdit} alt='edit' />
                <h3 style={{ marginLeft: '10px' }}>Редактировать билет</h3>
            </div>

            <div className={s.wrapper}>
                {isNotification && <Notification/> }
                {allTickets.map((ticketId, i) => {
                    return (
                        <div
                            key={ticketId}
                            onClick={() => ticketRequests.getTicket(i, ticketId, { ...states })}
                            className={highlight(ticketId, idSelectedTicket)}
                        >
                            {i + 1}
                            {i === indexTicket && isLoading ? <Loader color='green' width={33} height={33}/> : ''}
                        </div>
                    );
                })}
                <CreateEmptyTicket setAllTickets={setAllTickets} />
            </div>

            {isTagSelect && (
                <div style={{ display: 'flex' }}>
                    <select ref={selectRef} onChange={getOption}>
                        <option ref={refOption} hidden value=''>
                            Выберите операцию
                        </option>

                        {selectedTicket.map((number, i) => {
                            return <option key={number.questionId} value={`Изменить вопрос ${i + 1}`}>{`Изменить вопрос: ${i + 1}`}</option>;
                        })}

                        <option value='Добавить вопрос'>Добавить вопрос</option>
                    </select>
                    <DeleteTicket {...states} />
                </div>
            )}

            {selectedOption === 'Изменить вопрос' && <EditQuestion key={numberQuestion} {...states} />}
            {selectedOption === 'Добавить вопрос' && <AddQuestion key={indexTicket} {...states} />}
        </>
    );
}

export default EditTickets;

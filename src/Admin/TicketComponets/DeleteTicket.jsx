import React from 'react';
import Loader from '../layout/Loader.jsx';
import s from '../ticketStyles/deleteTicket.module.css';
function DeleteTicket({ idSelectedTicket, allTickets, setAllTickets, indexTicket, setIsTagSelect, setSelectedOption }) {
    const [isLoading, setIsLoading] = React.useState(false);

    async function deleteTicket() {
        const action = confirm('Удалить выбраный билет? Все данные безвозратно будут удалены');
        const token = localStorage.getItem('token');
        if (!action) return;
        setIsLoading(true);
        await fetch('http://147.45.159.11/api/ticketEditor/deleteTicket', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                ticketId: idSelectedTicket,
            }),
        });
        setIsLoading(false);
        const copy = [...allTickets];
        copy.splice(indexTicket, 1);
        setAllTickets(copy);
        setIsTagSelect(false);
        setSelectedOption('');
    }

    return (
        <button type='button' onClick={deleteTicket} className={s.wrapper}>
            {isLoading && <Loader color='red' />}
            {indexTicket + 1}
            <span className={`${s.line} ${s.degPlus}`}> </span>
            <span className={`${s.line} ${s.degMinus}`}> </span>
        </button>
    );
}

export default DeleteTicket;

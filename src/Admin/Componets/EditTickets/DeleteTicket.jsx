import React from 'react';
import Loader from '../Loader.jsx';
import s from '../../styles/EditTickets/deleteTicket.module.css';

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
            {isLoading && <Loader classNameLoader='loader' classNameBorder='red'/>}
            <span type='button' className={s.plus}>X</span>
        </button>
    );
}

export default DeleteTicket;

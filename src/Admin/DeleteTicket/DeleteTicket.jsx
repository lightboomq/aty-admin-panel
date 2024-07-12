import React from 'react';
import s from './deleteTicket.module.css';
import ModalWindow from '../ModalWindow/ModalWindow.jsx';
import GetAllTickets from '../GetAllTickets/GetAllTickets.jsx';

function DeleteTicket() {
    const [selectedTicketId, setSelectedTicketId] = React.useState('');
    const [selectTicketNum, setSelectedTicketNum] = React.useState('');
    const [modal, setModal] = React.useState(false);

    async function deleteTicket(e) {
        const token = localStorage.getItem('token');
        const ticketId = e.target.getAttribute('ticketid');

        console.log(e.target);
        setSelectedTicketId(ticketId);
        setSelectedTicketNum(e.target.textContent);
        setModal(true);

        await fetch('http://147.45.159.11/ticketEditor/deleteTicket', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                ticketId: ticketId,
            }),
        });
        deleteTicket();
        setModal(false);
    }

    return (
        <div>
            <GetAllTickets selectedTicketId={selectedTicketId} action={deleteTicket} />
            {modal ? <ModalWindow value1='Удалить билет' value2={selectTicketNum} /> : ''}
            <button className={s.btn} type='button'>
                Удалить билет
            </button>
        </div>
    );
}

export default DeleteTicket;

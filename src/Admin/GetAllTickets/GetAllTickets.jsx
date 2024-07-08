import React from 'react';
import s from './getAllTickets.module.css';

function GetAllTickets({ action }) {
    const token = localStorage.getItem('token');
    const [allTickets, setAllTickets] = React.useState([]);
    React.useEffect(() => {
        async function getTickets() {
            
            const response = await fetch('http://147.45.159.11/ticketEditor/tickets', {
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

    function getAction(e, action) {
        const ticketId = e.target.getAttribute('ticketid');

        if (action === 'deleteTicket') {
            async function deleteTicket() {
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
            }
            deleteTicket()
        }
    }

    return (
        <div className={s.wrapper}>
            {allTickets.map((ticket, i) => {
                return (
                    <div key={ticket.ticketId} onClick={e => getAction(e, action)} ticketid={ticket.ticketId} className={s.ticket}>
                        {i + 1}
                    </div>
                );
            })}
        </div>
    );
}

export default GetAllTickets;

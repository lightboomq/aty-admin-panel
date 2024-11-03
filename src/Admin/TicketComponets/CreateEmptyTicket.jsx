import React from 'react';
import s from '../ticketStyles/createEmptyTicket.module.css';
import Loader from '../layout/Loader.jsx';

function CreateEmptyTicket({ setAllTickets }) {
    const [isLoading, setIsLoading] = React.useState(false);
    const token = localStorage.getItem('token');

    async function createEmptyTicket() {
        setIsLoading(true);
        const res = await fetch('http://147.45.159.11/api/ticketEditor/createTicket', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const resJson = await res.json();
        setAllTickets(prev => [...prev, resJson.ticketId]);

        setIsLoading(false);
    }

    return (
        <button type='button' onClick={createEmptyTicket} className={s.wrapper}>
            {isLoading && <Loader color='blue' />}
            <span className={s.plus}>+</span>
        </button>
    );
}

export default CreateEmptyTicket;

import React from 'react';
import s from '../../styles/EditTickets/createEmptyTicket.module.css';
import Loader from '../Loader';

function CreateEmptyTicket({setAllTickets}) {
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
        const resJson = await res.json()
        setAllTickets((prev)=>[...prev,resJson])

        setIsLoading(false);

    }

    return (
        <div onClick={createEmptyTicket} className={s.wrapper}>
            {isLoading && <Loader />}
            <div className={s.plus}>+</div>
        </div>
    );
}

export default CreateEmptyTicket;

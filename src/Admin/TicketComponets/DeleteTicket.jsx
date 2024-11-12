import React from 'react';
import { ticketRequests } from '../../API.js';
import Loader from '../layout/Loader.jsx';
import s from '../ticketStyles/deleteTicket.module.css';
function DeleteTicket({ idSelectedTicket, allTickets, setAllTickets, indexTicket, setIsTagSelect, setSelectedOption }) {
    const [isLoading, setIsLoading] = React.useState(false);

    return (
        <button
            type='button'
            onClick={() =>
                ticketRequests.deleteTicket(
                    idSelectedTicket,
                    allTickets,
                    setAllTickets,
                    indexTicket,
                    setIsTagSelect,
                    setSelectedOption,
                    setIsLoading,
                )
            }
            className={s.wrapper}
        >
            {isLoading && <Loader color='red' />}
            {indexTicket + 1}
            <span className={`${s.line} ${s.degPlus}`}> </span>
            <span className={`${s.line} ${s.degMinus}`}> </span>
        </button>
    );
}

export default DeleteTicket;

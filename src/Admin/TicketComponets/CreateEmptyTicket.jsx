import React from 'react';
import { ticketRequests } from '../../API.js';
import Loader from '../layout/Loader.jsx';
import s from '../ticketStyles/createEmptyTicket.module.css';

function CreateEmptyTicket({ setAllTickets }) {
    const [isLoading, setIsLoading] = React.useState(false);

    return (
        <button type='button' onClick={() => ticketRequests.createEmptyTicket(setIsLoading, setAllTickets)} className={s.wrapper}>
            {isLoading && <Loader color='blue' width={30} height={30}/>}
            <span className={s.plus}>+</span>
        </button>
    );
}

export default CreateEmptyTicket;

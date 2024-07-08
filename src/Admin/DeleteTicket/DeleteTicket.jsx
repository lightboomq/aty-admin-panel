import React from 'react';
import GetAllTickets from '../GetAllTickets/GetAllTickets.jsx'
function DeleteTicket({action}) {
  
 
  return (
    <div>
        <GetAllTickets action={action}/>
        <button type='button'>Удалить билет</button>
    </div>
  );
};

export default  DeleteTicket;
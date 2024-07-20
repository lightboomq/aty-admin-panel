
async function DeleteTicket(e,idSelectedTicket,token) {
    
    const action = confirm('Удалить выбраный билет? Все данные безвозратно будут удалены')
    console.log(action)
    if(!action) return;
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
}

export default DeleteTicket;


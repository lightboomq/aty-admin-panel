import s from './createEmptyTicket.module.css'
function CreateEmptyTicket() {
    const token = localStorage.getItem('token')
    
    async function createEmptyTicket() {
        await fetch('http://147.45.159.11/ticketEditor/createTicket', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
    return (
        <div className={s.wrapper}>
            <button className={s.btn} onClick={createEmptyTicket} type='button'>
                Создать пустой билет
            </button>
        </div>
    );
}

export default CreateEmptyTicket;

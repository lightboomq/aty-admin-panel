import React from 'react';
function AllTickets() {
    async function getTickets() {
        const response = await fetch('http://147.45.159.11/tickets', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const json = await response.json();
        console.log(json);
    }
    return (
        <div>
            <button onClick={getTickets} type='button'>
                getTickets
            </button>
        </div>
    );
}

export default AllTickets;

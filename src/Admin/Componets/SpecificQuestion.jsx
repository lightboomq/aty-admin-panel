import React from 'react';
function SpecificQuestion() {
    async function getQuestion() {
        const response = await fetch('http://147.45.159.11/question', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ticketId: 1719675339512,
                questionId: 1719675555920,
            }),
        });
    }
    return (
        <div>
            <button onClick={getQuestion} type='button'>
                getQuestion
            </button>
        </div>
    );
}

export default SpecificQuestion;

import React from 'react';
function TestComponet({ userExam, userName }) {
    return <div>{userExam && userName}</div>;
}

export default TestComponet;

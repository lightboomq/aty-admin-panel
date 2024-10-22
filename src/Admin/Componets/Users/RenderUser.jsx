import React from 'react';
import s from '../../styles/users.module.css';
import DeleteUser from './DeleteUser.jsx';
import SetExamUser from './SetExamUser.jsx';
import logo from '../../../../assets/arrow.svg';
import logoSearch from '../../../../assets/searchUser.svg';
function RenderUser({ users, department }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isInput, setIsInput] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');

    const userFound = users.filter(name => {
        return name.secondName.toLowerCase().includes(inputValue.toLowerCase());
    });

    function highlightUser(i) {
        if (i % 2 === 0) return `${s.users} ${s.higlight}`;
        return s.users;
    }

    function getOpen() {
        setIsOpen(!isOpen);
    }

    return (
        <div style={{ marginLeft: '42px' }}>
            <h3 onClick={getOpen} className={s.title}>
                Колона {department}
                <img className={isOpen ? s.logoArrowActive : s.logoArrow} src={logo} alt='arrow' />
            </h3>

            <div className={s.wrapperSearchUser}>
                {isInput && isOpen && (
                    <input className={s.inputSearchUser} type='text' value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder='Поиск по фамилий...' />
                )}
                {isOpen && <img src={logoSearch} style={{ cursor: 'pointer' }} onClick={() => setIsInput(!isInput)} alt='search' />}
            </div>

            {isOpen &&
                userFound.map((user, i) => {
                    
                    return (
                        <div key={user.email} className={highlightUser(i)}>
                            {i + 1}
                            {'.'} {user.firstName} {user.secondName}
                            <div>
                                
                                {!user.isAppointExam && <SetExamUser
                                    email={user.email}
                                    isAppointExam={user.isAppointExam}
                                    userName={`${user.firstName} ${user.secondName}`}
                                />} 
                                <DeleteUser email={user.email} gender={user.secondName} userName={`${user.firstName} ${user.secondName}`} indexUser = {i}/>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}

export default RenderUser;

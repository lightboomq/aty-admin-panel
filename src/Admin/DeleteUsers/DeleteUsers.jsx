import React from 'react';
import s from './deleteUsers.module.css';
import logo from '../../../assets/deleteUser.svg';
import ModalWindow from './ModalWindow/ModalWindow.jsx';
function DeleteUsers() {
    const [users, setUsers] = React.useState([]);
    const [modal, setModal] = React.useState(false);
    const [confirm, setConfirm] = React.useState(false);
    const [userEmail, setUserEmail] = React.useState('');
    const [userName, setUserName] = React.useState({});
    
    React.useEffect(() => {
        const token = localStorage.getItem('token');
        async function getUsers() {
            const response = await fetch('http://147.45.159.11/userEditor/getAllUsers', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const jsonUsers = await response.json();
            setUsers(jsonUsers);
        }
        getUsers();
    }, []);
    
    function modalWindow(e) {
        setUserEmail(e.target.getAttribute('email'));
        setUserName({firstName:e.target.getAttribute('firstname'),secondName:e.target.getAttribute('secondname')})
        setModal(true);
    }

    if (confirm) {
        async function deleteUser() {
            const token = localStorage.getItem('token');
            await fetch('http://147.45.159.11/auth/deleteUser', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    email: userEmail,
                }),
            });
        }
        deleteUser();
        setConfirm(false);
    }
    return (
        <div className={s.wrapper}>
            {modal ? <ModalWindow userName = {userName} setConfirm = {setConfirm} setModal = {setModal}/> : ''}
            {users.map((user, i) => {
                return (
                    <p key={user.email} className={s.users}>
                        {`${i + 1}. `}
                        {`${user.firstName} ${user.secondName}`}
                        <img
                            email={user.email}
                            firstname={user.firstName}
                            secondname={user.secondName}
                            onClick={modalWindow}
                            className={s.logo}
                            alt='deleteUser'
                            src={logo}
                        />
                    </p>
                );
            })}
        </div>
    );
}

export default DeleteUsers;

import React from 'react';
import s from '../styles/deleteUsers.module.css';
import logo from '../../../assets/deleteUser.svg';
// import ModalWindow from '../ModalWindow/ModalWindow.jsx';
function DeleteUsers() {
    const [users, setUsers] = React.useState([]);
    const [modal, setModal] = React.useState(false);
    const [confirm, setConfirm] = React.useState(false);
    const [userEmail, setUserEmail] = React.useState('');
    const [userName, setUserName] = React.useState({});

    React.useEffect(() => {
        async function getUsers() {
            const token = localStorage.getItem('token');
            const response = await fetch('http://147.45.159.11/api/userEditor/getAllUsers', {
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

    if (confirm) {
        async function deleteUser() {
            const token = localStorage.getItem('token');
            await fetch('http://147.45.159.11/api/userEditor/deleteUser', {
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

    function modalWindow(e) {
        setUserEmail(e.target.getAttribute('email'));
        setUserName({ firstName: e.target.getAttribute('firstname'), secondName: e.target.getAttribute('secondname') });
        setModal(true);
    }
    function test(){
        setConfirm(
            confirm(`Удалить пользователя? ${userName.firstName} ${userName.secondName} Все данные будут удалены безвозвратно.`)
        )
        setModal(false)
    }
    function highlightUser(i) {
        if (i % 2 === 0) return `${s.users} ${s.higlight}`;
        return s.users;
    }
    return (
        <div className={s.wrapper}>
            {modal &&
                test
                
                // <ModalWindow
                //     value1='Удалить пользователя?'
                //     value2={`${userName.firstName} ${userName.secondName}`}
                //     setConfirm={setConfirm}
                //     setModal={setModal}
                // />
            }

            {users.map((user, i) => {
                return (
                    <p key={user.email} className={highlightUser(i)}>
                        {i + 1}
                        {'.'} {user.firstName} {user.secondName}
                        <img
                            email={user.email}
                            firstname={user.firstName}
                            secondname={user.secondName}
                            onClick={modalWindow}
                            className={s.logo}
                            alt='logoDelete'
                            src={logo}
                        />
                    </p>
                );
            })}
        </div>
    );
}

export default DeleteUsers;

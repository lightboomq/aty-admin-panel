import React from 'react';
import s from './login.module.css';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [login, setLogin] = React.useState('your_email@yandex.ru');
    const [password, setPassword] = React.useState('123456');
    const [errMessage, setErrMessage] = React.useState('');
    const navigate = useNavigate();

    async function enter() {
        try {
            const response = await fetch('http://147.45.159.11/api/auth/adminLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: login,
                    password: password,
                }),
            });
            if (!response.ok) {
                const json = await response.json();
                throw new Error(json.message);
            }
            const json = await response.json();
            localStorage.setItem('token', json.token);
            navigate('/admin');
        } catch (err) {
            setErrMessage(err);
        }
    }

    return (
        <form className={s.wrapper}>
            <p className={s.text}>Админ панель</p>
            <label className={s.wrapperInput}>
                Логин:
                <input value={login} onChange={e => setLogin(e.target.value)} className={s.input} type='text' />
            </label>

            <label className={s.wrapperInput}>
                Пароль:
                <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className={s.input}
                    type='password'
                    autoComplete='off'
                />
            </label>
            {errMessage ? <p className={s.err}>Не правильный логин или пароль.</p> : ''}
            <button onClick={enter} className={s.btnEnter} type='button'>
                Войти
            </button>
        </form>
    );
}

export default Login;

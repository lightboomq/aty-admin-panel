import React from 'react';
import s from './app.module.css';
import { Routes, Route } from 'react-router-dom';
import Login from './Login/Login.jsx'
import Admin from './Admin/Admin.jsx'
function App() {
    return (
        <div className={s.wrapper}>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/admin' element={<Admin/>}/>
            </Routes>
        </div>
    );
}

export default App;

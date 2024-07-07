import React from 'react';
import s from './header.module.css'
function Header() {
  return (
    <div className={s.wrapper}>
        <h1 className={s.h1Text}>Админ Панель</h1>

    </div>
  );
};

export default  Header;
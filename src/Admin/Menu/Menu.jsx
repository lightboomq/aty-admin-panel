import React from 'react';
import s from './menu.module.css'
function Menu() {
    const arr = ['Тест1','Тест1','Тест1','Тест1','Тест1','Тест1','Тест1','Тест1','Тест1','Тест1','Тест1',]
    return(
        <div className={s.wrapper}>
            {arr.map((item,i)=>{
                return(
                    <ol key={`${item+i}`}>
                        <li className={s.liItem}>{item}</li>
                    </ol>
                )
                
            })}
        </div>
    ) 
}

export default Menu;

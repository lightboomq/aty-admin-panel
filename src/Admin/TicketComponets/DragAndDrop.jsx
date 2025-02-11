import React from 'react';
import Errors from '../../store/Errors';
import s from '../ticketStyles/dragAndDrop.module.css';
function DragAndDrop({ fileInputRef, setImgSrc }) {
    const refZone = React.useRef(null);

    const overZone = e => {
        e.preventDefault();
        refZone.current.style.border = '2px dashed black';
    };
    const leaveZone = e => {
        e.preventDefault();
        refZone.current.style.border = '2px dashed #ccc';
    };

    const dropZone = e => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (!file.type.startsWith('image/')) {
            Errors.setMessage('Перетащите изображение');
            return;
        }
        Errors.setMessage('');
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
            setImgSrc(e.target.result);
        };

        refZone.current.style.border = '2px dashed #ccc';
    };

    return (
        <div
            className={s.dropZone}
            ref={refZone}
            onDragOver={overZone}
            onDragLeave={leaveZone}
            onDrop={dropZone}
            onClick={() => fileInputRef.current.click()}
        >
            Нажмите или перетащите изображение сюда
        </div>
    );
}

export default DragAndDrop;

import React, { useState, FC } from 'react';
import cl from './SlideBtn.module.css'

interface IProps {
    label: any;
    children?: any;
    direction: any;
    onClick?: any;
    trDisplay?: any;
}

const SlideBtn: FC<IProps> = ({label, children, direction, onClick, trDisplay}) => {
    const [isOpen, setIsOpen] = useState(false)

    function open(){
        setIsOpen(!isOpen)
    }

    return (
        <div onClick={onClick} style={{flexDirection: direction}} className={cl.collapse}>
            <div className={cl.toggle} onClick={() => open()}>{label} <span style={{display: trDisplay}}>{isOpen ? '▲' : '▼'}</span></div>
            {isOpen && <div className={cl.content}>{children}</div>}
        </div>
    );
};

export default SlideBtn;
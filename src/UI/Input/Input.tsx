import React, { FC, InputHTMLAttributes } from 'react';
import classes from './Input.module.css'

interface IInput extends InputHTMLAttributes<HTMLInputElement> { }

const Input: FC<IInput> = (props) => {
    return (
        <div className={classes.searchCont}>
            <input className={classes.input} {...props} />
            <button className={classes.searchIcon}>
                <img src="/icons/search-icon.png" alt="" />
            </button>
        </div>
    );
};

export default Input;
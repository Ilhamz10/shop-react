import React, { FC, InputHTMLAttributes } from 'react';
import classes from './Input.module.css'

import searchIcon from '../../icons/search-icon.png'

interface IInput extends InputHTMLAttributes<HTMLInputElement> { }

const Input: FC<IInput> = (props) => {
    return (
        <div className={classes.searchCont}>
            <input className={classes.input} {...props} />
            <button className={classes.searchIcon}>
                <img src={searchIcon} alt="" />
            </button>
        </div>
    );
};

export default Input;
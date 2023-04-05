import React, { ButtonHTMLAttributes, FC } from 'react';
import classes from './Button.module.css'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement>{
    width?: string;
}

const Button:FC<IButton> = ({children, width, ...props}) => {

    return (
        <button {...props} style={{width: width}} className={classes.button}>
            {children}
        </button>
    );
};

export default Button;
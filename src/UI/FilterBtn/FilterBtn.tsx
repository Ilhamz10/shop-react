import { StringifyOptions } from 'querystring';
import React, {FC} from 'react';
import cl from './FilterBtn.module.css'

interface IProps{
    id: string;
    text: string;
    checked: boolean;
    onClick: () => void;
}

const FilterBtn:FC<IProps> = ({id, text, checked, ...props}) => {
    return (
        <div>
            <input checked={checked} {...props} className={cl.input} type="checkbox" name="typeCare" id={id} />
            <label className={cl.filter} htmlFor={id}>{text}</label>
        </div>
    );
};

export default FilterBtn;
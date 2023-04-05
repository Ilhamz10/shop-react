import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { ProductActionTypes } from '../../../types/product';
import FilterBtn from '../../../UI/FilterBtn/FilterBtn';
import SortBtn from '../../../UI/SortBtn/SortBtn';
import ProductFilter from '../../ProductFilter/ProductFilter';
import classes from './MainHeader.module.css'

const MainHeader = () => {
    return (
        <div className={classes.mainHeader}>
            <div className={classes.top}>
                <h1>КОСМЕТИКА И ГИГИЕНА</h1>
                <div className={classes.sortBtnCont}>
                    <SortBtn />
                </div>
            </div>
            <ProductFilter id='header' />
        </div>
    );
};

export default MainHeader;
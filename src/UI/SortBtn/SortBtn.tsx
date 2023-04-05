import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { IProduct, ProductActionTypes } from '../../types/product';
import classes from './SortBtn.module.css'

const SortBtn = () => {
    const dispatch = useDispatch()
    const { products, filteredProducts, searchedProducts } = useTypeSelector(state => state.product)

    let products_local = JSON.parse(localStorage.getItem('products') as any)

    const [open, setOpen] = useState(false)
    const [selectedSort, setSelectedSort] = useState('По Названию по возрастанию')

    const sortType = ['По Названию по возрастанию', 'По Цене по возрастанию', 'По Цене по убыванию', 'По Названию по убыванию']

    function changeSortType(name: string, i: number) {
        setOpen(false);
        setSelectedSort(name)

        switch (i) {
            case 0:
                let sorted = (filteredProducts.length !== 0 ? filteredProducts : searchedProducts.length !== 0 ? searchedProducts : products).sort((a: IProduct, b: IProduct) => a.name.localeCompare(b.name))
                dispatch({ type: ProductActionTypes.PRODUCTS_SORT, payload: sorted })
                break;
            case 1:
                let sorted2 = (filteredProducts.length !== 0 ? filteredProducts : searchedProducts.length !== 0 ? searchedProducts : products).sort((a: IProduct, b: IProduct) => a.price - b.price)
                dispatch({ type: ProductActionTypes.PRODUCTS_SORT, payload: sorted2 })
                break;
            case 2:
                let sorted3 = (filteredProducts.length !== 0 ? filteredProducts : searchedProducts.length !== 0 ? searchedProducts : products).sort((a: IProduct, b: IProduct) => b.price - a.price)
                dispatch({ type: ProductActionTypes.PRODUCTS_SORT, payload: sorted3 })
                break;
            case 3:
                let sorted4 = (filteredProducts.length !== 0 ? filteredProducts : searchedProducts.length !== 0 ? searchedProducts : products).sort((a: IProduct, b: IProduct) => b.name.localeCompare(a.name))
                dispatch({ type: ProductActionTypes.PRODUCTS_SORT, payload: sorted4 })
                break;
        }
    }

    return (
        <div className={classes.sortBtnCont}>
            <h4>Сортировка:</h4>
            <div className={classes.dropDown}>
                <div onClick={() => setOpen(!open)} className={classes.dropBtn}>{selectedSort} &#9660;</div>
                {open && <div className={classes.dropDownContent}>
                    {sortType.map((name, i) =>
                        <div
                            onClick={() => changeSortType(name, i)}
                            key={i}
                        >
                            {name}
                        </div>
                    )}
                </div>}
            </div>
        </div>
    );
};

export default SortBtn;
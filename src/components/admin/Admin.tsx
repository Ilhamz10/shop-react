import React, { useEffect, useRef, useState } from 'react';
import SlideBtn from '../../UI/SlideBtn/SlideBtn';
import cl from './Admin.module.css'
import { useTypeSelector } from '../../hooks/useTypeSelector';
import Button from '../../UI/Button/Button';
import ChangeBtn from './chnageBtn/ChangeBtn';
import { IProduct } from '../../types/product';
import { filterTypes } from '../ProductFilter/ProductFilter';
import ChangeCont from './changeCont/ChangeCont';
import AddCont from './addCont/AddCont';
import { fetchProducts } from '../../store/action-creator/product';
import { useDispatch } from 'react-redux';

const Admin = () => {
    const { products } = useTypeSelector(state => state.product)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProducts() as any)
    }, [])

    return (
        <div data-testid='admin-page' className='container'>
            <div className={cl.cont}>
                <div className={cl.addProductCont}>
                    <SlideBtn
                        label={<Button data-testid='add-product'>
                            Добавить новый продукт
                        </Button>}
                        direction={'column'}
                        trDisplay={'none'}
                    >
                        <AddCont />
                    </SlideBtn>
                </div>
                {products.map((product: IProduct) =>
                    <SlideBtn key={product.id} trDisplay={'none'} direction={'column'} label={<ChangeBtn product={product} />}>
                        <ChangeCont key={product.id} product={product} />
                    </SlideBtn>
                )}
            </div>
        </div>
    );
};

export default Admin;
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

const Admin = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        setProducts(JSON.parse(localStorage.getItem('products') as any))
    }, [])

    return (
        <div className='container'>
            <div className={cl.cont}>
                <div className={cl.addProductCont}>
                    <SlideBtn
                        label={<Button>
                            Добавить новый продукт
                        </Button>}
                        direction={'column'}
                        trDisplay={'none'}
                    >
                        <AddCont setProducts={setProducts}/>
                    </SlideBtn>
                </div>
                {products.map((product: IProduct) =>
                    <SlideBtn key={product.id} trDisplay={'none'} direction={'column'} label={<ChangeBtn product={product} setProducts={setProducts} />}>
                        <ChangeCont key={product.id} product={product} />
                    </SlideBtn>
                )}
            </div>
        </div>
    );
};

export default Admin;
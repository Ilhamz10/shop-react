import React, { FC } from 'react';
import cl from './ChangeBtn.module.css'
import Button from '../../../UI/Button/Button';
import { IProduct, ProductActionTypes } from '../../../types/product';
import deleteBtn from '../../../icons/delete-icon.png'
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { useDispatch } from 'react-redux';

interface IProps {
    product: IProduct;
    setProducts?: any;
}

const ChangeBtn: FC<IProps> = ({ product }) => {
    const { products } = useTypeSelector(state => state.product)
    let products_local = JSON.parse(localStorage.getItem('products') as string) || products

    const dispatch = useDispatch()


    function deleteProduct(product: IProduct) {
        products_local = products_local.filter((prod: IProduct) => prod.id !== product.id)
        localStorage.setItem('products', JSON.stringify(products_local))
        dispatch({type: ProductActionTypes.CHANGE_PRODUCTS, payload: products_local})
    }

    return (
        <div className={cl.changeBtn}>
            <img className={cl.productImg} src={process.env.PUBLIC_URL + product.url} alt="" />
            <p>{product.name} {product.description} <span>{product.size} {product.sizeType}</span></p>
            <Button onClick={() => deleteProduct(product)}>
                <img src={deleteBtn} alt="" />
            </Button>
        </div>
    );
};

export default ChangeBtn;
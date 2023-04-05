import React, { useState, FC } from 'react';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { IProduct } from '../../../types/product';
import Button from '../../../UI/Button/Button';
import cl from './BasketProduct.module.css'
import { useDispatch } from 'react-redux';
import { BasketActionType } from '../../../types/basket';

interface IProps {
    product: IProduct;
}

const BasketProduct: FC<IProps> = ({ product }) => {
    const { basket } = useTypeSelector(state => state.basket)
    const dispatch = useDispatch()

    function increment(product: IProduct) {
        dispatch({
            type: BasketActionType.CHANGE_PRODUCT_COUNT, payload: basket.map(prod => {
                if (prod.id === product.id)
                    prod.productCount += 1
                return prod
            })
        })
    }

    function decrement() {
        dispatch({
            type: BasketActionType.CHANGE_PRODUCT_COUNT, payload: basket.map(prod => {
                if (prod.id === product.id && prod.productCount !== 1)
                    prod.productCount -= 1
                return prod
            })
        })
    }

    function deleteProduct(product: any) {
        let arr = basket.filter((prod) => prod.id !== product.id)
        dispatch({ type: BasketActionType.DELETE_FROM_BASKET, payload: arr })
    }


    return (
        <div className={cl.basketProduct}>
            <div className={cl.img}>
                <img src={product.url} alt="" />
            </div>
            <div className={cl.info}>
                <p className={cl.size}>{product.size} {product.sizeType}</p>
                <h2 className={cl.description}><span>{product.name} </span>{product.description}</h2>
                <p className={cl.size}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod, minus deserunt suscipit, qui ipsam voluptatum veniam, similique molestiae aspernatur culpa alias sequi expedita laudantium odit quam! Molestiae eaque ea debitis!</p>
            </div>
            <div className={cl.basketProductFunctional}>
                <div className={cl.countBtns}>
                    <button onClick={decrement}>-</button>
                    <span>{product.productCount}</span>
                    <button onClick={() => increment(product)}>+</button>
                </div>
                <h1 className={cl.price}>
                    {product.price * product.productCount} $
                </h1>
                <div className={cl.deleteBtn}>
                    <Button onClick={() => deleteProduct(product)}>
                        <img style={{ width: 23 }} src="/icons/delete-icon.png" alt="" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default BasketProduct;
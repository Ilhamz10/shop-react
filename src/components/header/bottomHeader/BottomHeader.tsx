import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { BasketActionType } from '../../../types/basket';
import { IProduct } from '../../../types/product';
import Button from '../../../UI/Button/Button';
import Input from '../../../UI/Input/Input';
import './bottomHeader.css'

const BottomHeader = () => {
    const navigate = useNavigate()

    const { currentProduct } = useTypeSelector(state => state.product)
    const { basket, allPrice } = useTypeSelector(state => state.basket);
    const dispatch = useDispatch()

    useEffect(() => {
        let price = 0
        if (basket.length != 0) {
            price = basket.reduce((sum: number, item: IProduct) => {
                return sum += item.price * item.productCount
            }, 0)
        }
        dispatch({ type: BasketActionType.SET_PRICE, payload: price.toFixed(2) })
    }, [basket, currentProduct.productCount])

    return (
        <div className='bottom-header container'>
            <div className="bottom-header-logo">
                <img src="/icons/main-logo.png" alt="" />
            </div>
            <div className="bottom-header-functional">
                <Link to={'/'}>
                    <Button className='bottom-header-btn'>
                        Каталог
                        <img src="/icons/catalog-btn-icon.png" alt="" />
                    </Button>
                </Link>
            </div>
            <div className="bottom-header-input">
                <Input placeholder='Поиск...' />
            </div>
            <div className="bottom-header-info">
                <div className="bottom-header-info-text">
                    <h4>+7 (777) 490-00-91</h4>
                    <p>время работы: 9:00-20:00</p>
                    <a href="#">Заказать звонок</a>
                </div>
                <img src="/imgs/bottom-header-img.png" alt="" />
            </div>
            <div className="price-list">
                <Button>
                    Прайс-лист
                    <img src="/icons/download-icon.png" alt="" />
                </Button>
            </div>
            <div className="bottom-header-basket-cont">
                <img src="/icons/basket-icon.png" alt="" />
                <div className='basket_count'>{basket.length}</div>
                <Link to={'basket'}>
                    <div className="bottom-header-basket-info">
                        <p>Корзина</p>
                        <h4>{allPrice} $</h4>
                    </div>
                </Link>
            </div>

            <div className="phone-bottom-catalog-btn">
                <img src="/icons/phone-catalog-icon.png" alt="" />
                Каталог
            </div>
            <div className="phone-bottom-search-btn">
                <img src="/icons/phone-search-icon.png" alt="" />
                Поиск
            </div>
        </div>
    );
};

export default BottomHeader;
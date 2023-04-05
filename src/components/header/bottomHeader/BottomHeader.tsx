import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { BasketActionType } from '../../../types/basket';
import { IProduct } from '../../../types/product';
import Button from '../../../UI/Button/Button';
import Input from '../../../UI/Input/Input';
import './bottomHeader.css'

import mainLogo from '../../../icons/main-logo.png'
import catalogIcon from '../../../icons/catalog-btn-icon.png'
import operatorImg from '../../../imgs/bottom-header-img.png'
import downloadIcon from '../../../icons/download-icon.png'
import basketIcon from '../../../icons/basket-icon.png'
import blackCatalogIcon from '../../../icons/phone-catalog-icon.png'
import searchIcon from '../../../icons/phone-search-icon.png'

const BottomHeader = () => {

    const { currentProduct } = useTypeSelector(state => state.product)
    const { basket, allPrice } = useTypeSelector(state => state.basket);
    const dispatch = useDispatch()

    const [count, setCount] = useState(0)
    useEffect(() => {
        let price = 0
        if (basket.length !== 0) {
            price = basket.reduce((sum: number, item: IProduct) => {
                return sum += item.price * item.productCount
            }, 0)
            setCount(basket.reduce((sum: number, item: IProduct) => {
                return sum += item.productCount
            }, 0))
        } else {
            setCount(0)
        }
        dispatch({ type: BasketActionType.SET_PRICE, payload: price.toFixed(2) })
    }, [basket, currentProduct.productCount])

    return (
        <div className='bottom-header container'>
            <div className="bottom-header-logo">
                <img src={mainLogo} alt="" />
            </div>
            <div className="bottom-header-functional">
                <Link to={'/'}>
                    <Button className='bottom-header-btn'>
                        Каталог
                        <img src={catalogIcon} alt="" />
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
                <img src={operatorImg} alt="" />
            </div>
            <div className="price-list">
                <Button>
                    Прайс-лист
                    <img src={downloadIcon} alt="" />
                </Button>
            </div>
            <div className="bottom-header-basket-cont">
                <Link to={'basket'}>
                    <img src={basketIcon} alt="" />
                    <div className='basket_count'>{count}</div>

                    <div className="bottom-header-basket-info">
                        <p>Корзина</p>
                        <h4>{allPrice} $</h4>
                    </div>
                </Link>
            </div>

            <div className="phone-bottom-catalog-btn">
                <img src={blackCatalogIcon} alt="" />
                Каталог
            </div>
            <div className="phone-bottom-search-btn">
                <img src={searchIcon} alt="" />
                Поиск
            </div>
        </div>
    );
};

export default BottomHeader;
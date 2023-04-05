import React, { useEffect } from 'react';
import './topHeader.css'
import Button from '../../../UI/Button/Button';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { IProduct } from '../../../types/product';
import { BasketActionType } from '../../../types/basket';

const TopHeader = () => {
    const { basket } = useTypeSelector(state => state.basket);

    return (
        <div className="top-header container">
            <div className="top-header-info">
                <div className="location">
                    <img src="/icons/location_icon.png" alt="no img" />
                    <div className="location-text">
                        <h4>г. Кокчетав, ул. Ж. Ташенова 129Б</h4>
                        <p>(Рынок Восточный)</p>
                    </div>
                </div>
                <div className="mail">
                    <img src="/icons/mail_icon.png" alt="no img" />
                    <div className="mail-text">
                        <h4>opt.sultan@mail.ru</h4>
                        <p>На связи в любое время</p>
                    </div>
                </div>
            </div>
            <div className="menu-btn">
                <Button>
                    <img src="/icons/catalog-btn-icon.png" alt="" />
                </Button>
            </div>
            <div className="top-header-logo">
                <img src="/icons/main-logo.png" alt="" />
            </div>
            <div className="top-header-basket-cont">
                <Link to={'basket'}>
                    <img src="/icons/basket-icon.png" alt="" />
                    <div className='basket_count'>{basket.length}</div>
                </Link>
            </div>
            <div className="top1-header-info">
                <div className="top1-header-info-text">
                    <h4>+7 (777) 490-00-91</h4>
                    <p>время работы: 9:00-20:00</p>
                    <a href="#">Заказать звонок</a>
                </div>
            </div>
            <nav className='top-header-nav'>
                <a>О компании</a>
                <a>Доставка и оплата</a>
                <a>Возврат</a>
                <a>Контакты</a>
            </nav>
        </div>
    );
};

export default TopHeader;
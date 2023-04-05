import React from 'react';
import BottomHeader from './bottomHeader/BottomHeader';
import './header.css'
import TopHeader from './topHeader/TopHeader';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTypeSelector } from '../../hooks/useTypeSelector';

const Header = () => {
    const { currentProduct } = useTypeSelector(state => state.product)

    const navigate = useNavigate()
    const location = useLocation()
    const path = location.pathname

    return (
        <header>
            <TopHeader />
            <hr />
            <BottomHeader />
            <hr />
            <nav className='header-nav container'>
                <button onClick={() => navigate(-1)} className='back-btn'>
                    <div className='back-icon'>&#60;</div>
                    Назад
                </button>
                <div className="breadcrumbs">
                    <Link to={'/'} className='breadcrumb'>Главная</Link>
                    {path === '/basket' ?
                        <span className='breadcrumb-span'>Корзина</span> :
                        path === '/product' ?
                            <>
                                <Link to={'/'} className='breadcrumb'>Косметика и гигиена</Link>
                                <span className='breadcrumb-span'>{currentProduct.name} {currentProduct.description}</span>
                            </>
                            :
                            <span className='breadcrumb-span'>Косметика и гигиена</span>
                    }
                </div>
            </nav>
        </header>
    );
};

export default Header;
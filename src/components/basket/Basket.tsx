import React, { useState } from 'react';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import cl from './Basket.module.css'
import Product from '../Product/Product';
import Button from '../../UI/Button/Button';
import BasketProduct from './BasketProduct/BasketProduct';
import { useDispatch } from 'react-redux';
import { BasketActionType } from '../../types/basket';
import Modal from '../Modal/Modal';

import doubleCheckIcon from '../../icons/icon-double-check.png'

const Basket = () => {
    const [modalActive, setModalActive] = useState(false)

    const { basket, allPrice } = useTypeSelector(state => state.basket)
    const dispatch = useDispatch()

    function checkout() {
        if (basket.length !== 0) {
            dispatch({ type: BasketActionType.CHANGE_PRODUCT_COUNT, payload: [] })
            setModalActive(true)
        }
    }

    return (
        <div className='container'>
            <h1>Корзина</h1>
            <div className={cl.main}>
                {basket.length === 0
                    ? <h1 className={cl.h1}>В корзине нет продуктов</h1>
                    : basket.map(product =>
                        <BasketProduct key={product.id} product={product} />
                    )
                }
            </div>
            <div className={cl.bottom}>
                <Button onClick={checkout}>
                    Оформить заказ
                </Button>
                <div className={cl.price}>
                    <h2>{allPrice} $</h2>
                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <div className={cl.modalDoubleCheck}>
                    <img src={doubleCheckIcon} alt="" />
                </div>
                <h1 className={cl.modalTitle}>Спасибо за заказ</h1>
                <p className={cl.modalText}>Наш менеджер свяжется с вами в ближайшее время</p>
            </Modal>
        </div>
    );
};

export default Basket;
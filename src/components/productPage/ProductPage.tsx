import React, { useEffect, useState } from 'react';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import cl from './ProductPage.module.css'
import Button from '../../UI/Button/Button';
import { useDispatch } from 'react-redux';
import { IProduct, ProductActionTypes } from '../../types/product';
import { BasketActionType } from '../../types/basket';
import SlideBtn from '../../UI/SlideBtn/SlideBtn';

import whiteBasketIcon from '../../icons/white-basket-icon.png'
import shareIcon from '../../icons/icon-share.png'
import downloadIcon from '../../icons/icon-download.png'

const ProductPage = () => {
    const [localCount, setLocalCount] = useState(1)
    const { basket } = useTypeSelector(state => state.basket)
    const { currentProduct } = useTypeSelector(state => state.product)
    const dispatch = useDispatch()

    function increment() {
        setLocalCount(prev => prev + 1)
    }

    function decrement() {
        if (localCount === 1) return
        setLocalCount(prev => prev - 1)
    }

    function addToBasket(): void {
        currentProduct.productCount = localCount
        console.log(currentProduct.productCount);

        dispatch({ type: ProductActionTypes.SET_CURRENT_PRODUCT, payload: currentProduct })
        if (!basket.some(product => currentProduct.id === product.id)) {
            dispatch({ type: BasketActionType.ADD_TO_BASKET, payload: currentProduct })
        }
    }

    return (
        <div className='container'>
            <main className={cl.main}>
                <div className={cl.productImg}>
                    <img src={process.env.PUBLIC_URL + currentProduct.url} alt="" />
                </div>
                <div className={cl.info}>
                    <p className={cl.inStock}>В наличии</p>
                    <p className={cl.description}><span>{currentProduct.name} </span>{currentProduct.description}</p>
                    <p className={cl.size}>{currentProduct.size} {currentProduct.sizeType}</p>

                    <div className={cl.grid}>
                        <div className={cl.price}>
                            <p className={cl.productAllPrice}>{currentProduct.price * localCount}$</p>
                            <div className={cl.countBtns}>
                                <button onClick={decrement}>-</button>
                                <span>{localCount}</span>
                                <button onClick={() => increment()}>+</button>
                            </div>
                            <Button onClick={() => addToBasket()} >
                                В корзину
                                <img src={whiteBasketIcon} alt="" />
                            </Button>
                        </div>

                        <div className={cl.basketBtn}>
                            <Button onClick={() => addToBasket()} >
                                В корзину
                                <img src={whiteBasketIcon} alt="" />
                            </Button>
                        </div>
                        <button className={cl.shareBtn}>
                            <img src={shareIcon} alt="" />
                        </button>
                        <div className={cl.promotion}>При покупке от <span>10 000 ₸</span> бесплатная доставка по Кокчетаву и области</div>
                        <button className={cl.priceListBtn}>
                            Прайс-лист
                            <img src={downloadIcon} alt="" />
                        </button>
                    </div>

                    <div className={cl.productInfo}>
                        <p><span>Штрихкод: </span>{currentProduct.barcode}</p>
                        <p><span>Производитель: </span>{currentProduct.manufactor}</p>
                        <p><span>Бренд: </span>{currentProduct.brand}</p>
                        <p><span>Тип ухода: </span>{currentProduct?.typeOfCare?.map((care: any) => {
                            if (currentProduct.typeOfCare.length > 1
                                && care != currentProduct.typeOfCare.at(-1)) return `${care}, `
                            return care
                        }
                        )}</p>
                    </div>
                    <div className={cl.colCont}>
                        <div className={cl.col}>
                            <SlideBtn label='Описание' direction='column'>
                                <p className={cl.colText}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis amet error alias recusandae magni quis debitis eaque! Officiis voluptate et quia obcaecati? Accusamus modi repellat voluptate debitis dolorem repudiandae eligendi! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis amet error alias recusandae magni quis debitis eaque! Officiis voluptate et quia obcaecati? Accusamus modi repellat voluptate debitis dolorem repudiandae eligendi!</p>
                            </SlideBtn>
                        </div>
                        <SlideBtn label='Характеристики' direction={'column'}>
                            <div className={cl.colInfo}>
                                <p><span>Назначение: </span>{currentProduct.name}</p>
                                <p><span>Тип: </span>{currentProduct.name}</p>
                                <p><span>Производитель: </span>460404</p>
                                <p><span>Бренд: </span>4604049097548</p>
                                <p><span>Артикул: </span>4604049097548</p>
                                <p><span>Штрихкод: </span>{currentProduct.barcode}</p>
                                <p><span>Вес: </span>{currentProduct.size} {currentProduct.sizeType}</p>
                                <p><span>Объем: </span>{currentProduct.size} {currentProduct.sizeType}</p>
                                <p><span>Кол-во в коробке: </span>{currentProduct.size} {currentProduct.sizeType}</p>
                            </div>
                        </SlideBtn>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProductPage;
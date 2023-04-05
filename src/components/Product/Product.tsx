import React, { FC } from 'react';
import cl from './Product.module.css';
import Button from '../../UI/Button/Button';
import { IProduct, ProductActionTypes } from '../../types/product';
import { useSelector } from 'react-redux';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { useDispatch } from 'react-redux';
import { BasketActionType } from '../../types/basket';
import { Link } from 'react-router-dom';
import whiteBasket from '../../icons/white-basket-icon.png';

interface IProps {
    product: IProduct;
}

const Product: FC<IProps> = ({ product }) => {

    const { basket } = useTypeSelector(state => state.basket)

    const dispatch = useDispatch()

    function addToBasket(id: number): void {
        if (!basket.some(prod => product.id === prod.id)) {
            const basketProduct = product
            dispatch({ type: BasketActionType.ADD_TO_BASKET, payload: basketProduct })
        }
    }

    return (
        <div className={cl.product}>
            <img className={cl.productImg} src={product.url === undefined ? '' : product.url?.includes('https://') ? product.url : process.env.PUBLIC_URL + product.url} alt="" />
            <div className={cl.info}>
                <p className={cl.size}>{product.size} {product.sizeType}</p>
                <Link className={cl.link} to={'product'}>
                    <p onClick={() => dispatch({ type: ProductActionTypes.SET_CURRENT_PRODUCT, payload: product })} className={cl.description}><span>{product.name} </span>{product.description}</p>
                </Link>
                <div className={cl.miniInfo}>
                    <p><span>Штрихкод: </span>{product.barcode}</p>
                    <p><span>Производитель: </span>{product.manufactor}</p>
                    <p><span>Бренд: </span>{product.brand}</p>
                    <p><span>Тип ухода: </span>{product.typeOfCare.map((care, index) => {
                        if (product.typeOfCare.length > 1
                            && care != product.typeOfCare.at(-1)) return `${care}, `
                        return care
                    }
                    )}</p>
                </div>
            </div>
            <div className={cl.price}>
                <p>{product.price} $</p>
                <Button onClick={() => addToBasket(product.id)}>
                    В корзину
                    <img src={whiteBasket} alt="" />
                </Button>
            </div>
        </div>
    );
};

export default Product;
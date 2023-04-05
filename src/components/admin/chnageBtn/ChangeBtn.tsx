import React, {FC} from 'react';
import cl from './ChangeBtn.module.css'
import Button from '../../../UI/Button/Button';
import { IProduct } from '../../../types/product';
import deleteBtn from '../../../icons/delete-icon.png'

interface IProps{
    product: IProduct;
    setProducts: any;
}

const ChangeBtn: FC<IProps> = ({product, setProducts}) => {
    let products = JSON.parse(localStorage.getItem('products') as string)

    function deleteProduct(product: IProduct){
        products = products.filter((prod: IProduct) => prod.id !== product.id)
        localStorage.setItem('products', JSON.stringify(products))
        setProducts(products)
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
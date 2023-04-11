import React, { useEffect, useState, FC } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { fetchProducts } from '../../../store/action-creator/product';
import Button from '../../../UI/Button/Button';
import { getPageCount, getPagesArray } from '../../../utils/pages';
import Product from '../../Product/Product';
import MainAside from '../MainAside/MainAside';
import cl from './MainMain.module.css'
import { Link } from 'react-router-dom';
import { ProductActionTypes } from '../../../types/product';



const MainMain: FC = () => {
    const { products, filteredProducts, searchedProducts } = useTypeSelector(state => state.product)
    const dispatch = useDispatch()

    const totalCount = (filteredProducts.length !== 0 && !filteredProducts.includes('Извините') ? filteredProducts as any : searchedProducts.length !== 0 && !searchedProducts.includes('Извините') ? searchedProducts : filteredProducts.includes('Извините') || searchedProducts.includes('Извините') ? [''] : products).length

    let [currentPage, setCurrentPage] = useState(0)
    let totalPages = getPageCount(totalCount, 15)
    let pagesArray = getPagesArray(totalPages)
    function changePage(p: number) {
        setCurrentPage(p)
    }

    useEffect(() => {
        dispatch(fetchProducts() as any)
    }, [])

    useEffect(() => {
        console.log(products)
    }, [products])

    return (
        <div className={cl.wrapper}>
            <div className={cl.productsCont}>
                {searchedProducts.includes('Извините') || filteredProducts.includes('Извините') ? <p className={cl.warning}><span>{searchedProducts.length !== 0 ? searchedProducts[0] : filteredProducts[0]}</span>{searchedProducts.length !== 0 ? searchedProducts[1] : filteredProducts[1]}</p> :
                    (filteredProducts.length !== 0 ? filteredProducts as any : searchedProducts.length !== 0 ? searchedProducts : products).map((product: any, index: any) => {
                        if (currentPage * 15 <= index && index < (currentPage + 1) * 15) {
                            return <Product key={product.id} product={product} />
                        }
                    }
                    )}
            </div>
            {searchedProducts.includes('Извините') || filteredProducts.includes('Извините') ||
                <div className={cl.pagination}>
                    <span className={cl.pagLeftRight} onClick={() => changePage(currentPage !== 0 ? currentPage - 1 : 0)}>
                        {'<'}
                    </span>
                    <div>
                        {pagesArray.map((p, i) =>
                            <span key={p} onClick={() => changePage(p)} className={currentPage === p ? cl.active : cl.pagBtn}>
                                {p + 1}
                            </span>
                        )}
                    </div>
                    <span className={cl.pagLeftRight} onClick={() => changePage(currentPage !== totalPages - 1 ? currentPage + 1 : totalPages - 1)} >
                        {'>'}
                    </span>
                </div>
            }
            <Link data-testid='admin-link' to={'/admin'}>
                <div className={cl.adminBtn}>
                    <Button>
                        Админ панель
                    </Button>
                </div>
            </Link>
        </div>
    );
};

export default MainMain;
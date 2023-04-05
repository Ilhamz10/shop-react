import React, {FC} from 'react';
import { useDispatch } from 'react-redux';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { ProductActionTypes } from '../../types/product';
import FilterBtn from '../../UI/FilterBtn/FilterBtn';
import classes from './ProductFilter.module.css'

 export const filterTypes: string[] = [
    'Уход за телом',
    'Уход за руками',
    'Уход за ногами',
    'Уход за лицом',
    'Уход за волосами',
    'Средства для загара',
    'Средства для бритья',
    'Подарочные наборы',
    'Гигиеническая продукция',
    'Гигиена полости рта',
    'Бумажная продукция'
]

const filters: string[] = []

interface IProps {
    id: string;
}

const ProductFilter:FC<IProps> = ({id}) => {

    const {searchedProducts, products} = useTypeSelector(state => state.product)
    const dispatch = useDispatch()

    function changeFilter(filterType: string) {
        if (!filters.includes(filterType)){
            filters.push(filterType)
        }
        else filters.splice(filters.indexOf(filterType), 1)

        dispatch({ type: ProductActionTypes.PRODUCTS_FILTER, payload: (searchedProducts.length !== 0 && !searchedProducts.includes('Извините') ? searchedProducts : products).filter(product => product.typeOfCare.some((care: string) => filters.includes(care))) })
    }



    return (
        <div className={classes.bottom}>
            {filterTypes.map((filterType, index) =>
                <FilterBtn key={index} text={filterType} checked={filters.includes(filterType)} id={index + id} onClick={() => changeFilter(filterType)} />
            )}
        </div>
    );
};

export default ProductFilter;
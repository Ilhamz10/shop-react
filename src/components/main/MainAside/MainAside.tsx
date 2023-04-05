import React, { ChangeEvent, useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { ProductActionTypes } from '../../../types/product';
import Button from '../../../UI/Button/Button';
import FilterBtn from '../../../UI/FilterBtn/FilterBtn';
import Input from '../../../UI/Input/Input';
import ProductFilter from '../../ProductFilter/ProductFilter';
import cl from './MainAside.module.css'
import SlideBtn from '../../../UI/SlideBtn/SlideBtn';
import SortBtn from '../../../UI/SortBtn/SortBtn';

let filteredManufacturers: string[] = []
let filteredBrands: string[] = []

const filterTypes: string[] = [
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

const MainAside = () => {
    let maxPrice = useRef<any>('10000')
    let minPrice = useRef<any>('0')

    let manufacturersInputs = useRef() as any
    let brandsInputs = useRef() as any

    const [brandsLimit, setBrandsLimit] = useState(2)
    const [manufacturersLimit, setManufacturersLimit] = useState(2)

    const { filteredProducts } = useTypeSelector(state => state.product)
    let products = JSON.parse(localStorage.getItem('products') as any) || []
    const dispatch = useDispatch()

    const manufacturers: string[] = []
    const brands: string[] = []

    products.forEach((product: any) => {
        if (!manufacturers.includes(product.manufactor))
            manufacturers.push(product.manufactor)
        if (!brands.includes(product.brand))
            brands.push(product.brand)
    })

    function manufacturerFilter(manufacturer: string) {
        if (!filteredManufacturers.includes(manufacturer))
            filteredManufacturers.push(manufacturer)
        else filteredManufacturers.splice(filteredManufacturers.indexOf(manufacturer), 1)
    }

    useEffect(() => {
        filteredManufacturers = []
        filteredBrands = []
        setFilters()
    }, [])

    function brandFilter(brand: string) {
        if (!filteredBrands.includes(brand))
            filteredBrands.push(brand)
        else filteredBrands.splice(filteredBrands.indexOf(brand), 1)
    }
    let max: number
    function setFilters() {
        max = +maxPrice.current.value === 0 ? 10000 : +maxPrice.current.value

        let filtered = (filteredProducts.length === 0 ? products : filteredProducts).filter((product: any) => (filteredBrands.length === 0 ? brands : filteredBrands).includes(product.brand)
            && (filteredManufacturers.length === 0 ? manufacturers : filteredManufacturers).includes(product.manufactor)
            && (product.price > +minPrice.current.value && product.price < max));

        filtered = filtered.length === 0 ? ['Извините', ', не найдено товаров, соответсвующих заданным вами условиям.']
            : filtered


        if (filteredProducts.length === 0) {
            dispatch({
                type: ProductActionTypes.PRODUCTS_SEARCH,
                payload: filtered
            })
        } else {
            dispatch({
                type: ProductActionTypes.PRODUCTS_FILTER,
                payload: filtered
            })
        }
    }

    function clearFilters() {
        filteredManufacturers = []
        filteredBrands = []
        let manufacturerInputs = manufacturersInputs.current.querySelectorAll('input')
        for (let input of manufacturerInputs) input.checked = false

        let brandInputs = brandsInputs.current.querySelectorAll('input')
        for (let input of brandInputs) input.checked = false

        maxPrice.current.value = null
        minPrice.current.value = null
    }

    let isOpen = true

    const [logo, setLogo] = useState('ᐯ')

    function toggleParameters() {
        let searchCont: any = document.querySelector('#search-cont')
        if (isOpen) {
            searchCont.style = 'transform: scale(0); height: 0'
            isOpen = false
            setLogo('ᐯ')
        } else {
            searchCont.style = 'transform: scale(1): height: auto'
            isOpen = true
            setLogo('ᐱ')
        }
    }

    return (
        <div className={cl.wrapper}>
            <div className={cl.search}>
                <h3>ПОДБОР ПО ПАРАМЕТРАМ</h3>
                <button onClick={toggleParameters} className={cl.toggle}>{logo}</button>
            </div>
            <div id='search-cont' className={cl.searchCont}>
                <div className={cl.priceFilterCont}>

                    <p>Цена <span>$</span></p>
                    <div className={cl.priceFilter}>
                        <input ref={minPrice} type='text' placeholder='0' />
                        <span>-</span>
                        <input ref={maxPrice} type='text' placeholder='10 000' />
                    </div>
                </div>
                <div className={cl.manufactorFilterCont}>
                    <h3>Производитель</h3>
                    <Input placeholder='Поиск...' />
                    <div ref={manufacturersInputs} className={cl.checkbox}>
                        {manufacturers.map((manufacturer, index) => {
                            if (index > manufacturersLimit) return
                            return <div key={index}>
                                <input onClick={() => manufacturerFilter(manufacturer)} type="checkbox" id={`${index}manufactor`} />
                                <label htmlFor="manufactor">{manufacturer}</label>
                            </div>
                        }
                        )}
                        <SlideBtn label='Показать больше' direction={'column'} onClick={() => setManufacturersLimit(prev => Math.abs(prev - (manufacturers.length + 2)))} />
                    </div>
                </div>
                <div className={cl.manufactorFilterCont}>
                    <h3>Бренд</h3>
                    <Input placeholder='Поиск...' />
                    <div ref={brandsInputs} className={cl.checkbox}>
                        {brands.map((brand, index) => {
                            if (index > brandsLimit) return
                            return <div key={index}>
                                <input onClick={() => brandFilter(brand)} type="checkbox" id={`${index}brand`} />
                                <label htmlFor="manufactor">{brand}</label>
                            </div>
                        })}
                        <SlideBtn label='Показать больше' direction={'column'} onClick={() => setBrandsLimit(prev => Math.abs(prev - (brands.length + 2)))} />
                    </div>
                </div>
                <div className={cl.btnCont}>
                    <Button onClick={setFilters} width={'60%'}>
                        Показать
                    </Button>
                    <Button onClick={clearFilters}>
                        <img src="/icons/delete-icon.png" alt="" />
                    </Button>
                </div>
            </div>
            <div className={cl.sideFilters}>
                <ProductFilter id='side' />
            </div>
            <div className={cl.sortBtnCont}>
                <SortBtn />
            </div>
        </div>
    );
};

export default MainAside;
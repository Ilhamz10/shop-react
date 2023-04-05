import React, { FC, useRef } from 'react';
import cl from './ChangeCont.module.css'
import { IProduct } from '../../../types/product';
import SlideBtn from '../../../UI/SlideBtn/SlideBtn';
import { filterTypes } from '../../ProductFilter/ProductFilter';
import Button from '../../../UI/Button/Button';

interface IProps {
    product: IProduct;
}

let checkedTypesOfCare: string[] = []

const ChangeCont: FC<IProps> = ({ product }) => {

    let products = JSON.parse(localStorage.getItem('products') as any)

    checkedTypesOfCare = [...product.typeOfCare]

    const priceInput = useRef({ value: 0 })
    const nameInput = useRef({ value: '' })
    const brandInput = useRef({ value: '' })
    const manufacturerInput = useRef({ value: '' })
    const urlInput = useRef({ value: '' })
    const descriptionInput = useRef({ value: '' })
    const sizeInput = useRef({ value: 0 })
    const sizeTypeInput = useRef({ value: '' })
    const barcodeInput = useRef({ value: 0 })

    function changeTypeOfCare(typeOfCare: string) {
        if (checkedTypesOfCare.includes(typeOfCare))
            checkedTypesOfCare.splice(checkedTypesOfCare.indexOf(typeOfCare), 1)
        else checkedTypesOfCare.push(typeOfCare)
        console.log(checkedTypesOfCare)
    }

    function updateProduct(product: IProduct) {
        product.price = +priceInput.current.value
        product.barcode = +barcodeInput.current.value
        product.brand = brandInput.current.value
        product.description = descriptionInput.current.value
        product.manufactor = manufacturerInput.current.value
        product.name = nameInput.current.value
        product.size = sizeInput.current.value
        product.sizeType = sizeTypeInput.current.value
        product.url = urlInput.current.value
        product.typeOfCare = checkedTypesOfCare
        
        products = products.map((prod: IProduct) => {
            if(prod.id === product.id) return product
            return prod
        })

        localStorage.setItem('products', JSON.stringify(products))
    }


    return (
        <div className={cl.changeCont}>
            <div className={cl.productInfo}>
                <div className={cl.left}>
                    <label htmlFor="name">Название:</label>
                    <input
                        ref={nameInput as any}
                        defaultValue={product.name}
                        type="text"
                        id='name'
                    />

                    <label htmlFor="manufacturer">Производитель:</label>
                    <input
                        ref={manufacturerInput as any}
                        defaultValue={product.manufactor}
                        type="text"
                        id='manufacturer'
                    />

                    <label htmlFor="brand">Бренд:</label>
                    <input
                        ref={brandInput as any}
                        defaultValue={product.brand}
                        type="text"
                        id='brand'
                    />

                    <label htmlFor="price">Цена:</label>
                    <input
                        defaultValue={product.price}
                        ref={priceInput as any}
                        type="text"
                        id='price'
                    />

                    <label htmlFor="description">Описание:</label>
                    <textarea
                        ref={descriptionInput as any}
                        id="description"
                        defaultValue={product.description}
                    ></textarea>
                </div>
                <div className={cl.right}>
                    <label htmlFor="size">Размер:</label>
                    <input
                        ref={sizeInput as any}
                        defaultValue={product.size}
                        type="text"
                        id='size'
                    />

                    <label htmlFor="sizetype">Тип размера:</label>
                    <input
                        ref={sizeTypeInput as any}
                        defaultValue={product.sizeType}
                        type="text"
                        id='sizetype'
                    />

                    <label htmlFor="url">URL Каринки:</label>
                    <input
                        ref={urlInput as any}
                        defaultValue={product.url}
                        type="text" 
                        id='url'
                    />

                    <label htmlFor="barcode">Бренд:</label>
                    <input
                        ref={barcodeInput as any}
                        defaultValue={product.barcode}
                        type="text"
                        id='barcode'
                    />

                    <SlideBtn direction={'column'} label={'Тип ухода'}>
                        <div className={cl.typeOfCareCont}>
                            {filterTypes.map((filterType, index) =>
                                <div key={index} className={cl.typeOfCare}>
                                    <input
                                        defaultChecked={product.typeOfCare.includes(filterType)}
                                        name='typeOfCare'
                                        onClick={() => changeTypeOfCare(filterType)}
                                        type="checkbox"
                                        id={'type-of-care' + index}
                                    />
                                    <label htmlFor="type-of-care">{filterType}</label>
                                </div>
                            )}
                        </div>
                    </SlideBtn>
                </div>
            </div>
            <Button onClick={() => updateProduct(product)}>
                Update
            </Button>
        </div>
    );
};

export default ChangeCont;
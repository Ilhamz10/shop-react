import React, { useRef, FC } from 'react';
import SlideBtn from '../../../UI/SlideBtn/SlideBtn';
import { filterTypes } from '../../ProductFilter/ProductFilter';
import cl from './AddCont.module.css'
import Button from '../../../UI/Button/Button';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { ProductActionTypes } from '../../../types/product';
import { useDispatch } from 'react-redux';

interface IProps {
    setProducts?: any
}

const AddCont: FC<IProps> = () => {

    const { products } = useTypeSelector(state => state.product)
    const dispatch = useDispatch()

    let checkedTypesOfCare: string[] = []

    const priceInput = useRef({ value: 0 })
    const nameInput = useRef({ value: '' })
    const brandInput = useRef({ value: '' })
    const manufacturerInput = useRef({ value: '' })
    const urlInput = useRef({ value: '' })
    const descriptionInput = useRef({ value: '' })
    const sizeInput = useRef({ value: 0 })
    const sizeTypeInput = useRef({ value: '' })
    const barcodeInput = useRef({ value: 0 })
    const checkbox = useRef() as any

    function changeTypeOfCare(typeOfCare: string) {
        if (checkedTypesOfCare.includes(typeOfCare))
            checkedTypesOfCare.splice(checkedTypesOfCare.indexOf(typeOfCare), 1)
        else checkedTypesOfCare.push(typeOfCare)
    }

    function addProduct() {
        let newProduct = {
            id: products.at(-1).id + 1,
            url: urlInput.current.value,
            barcode: +barcodeInput.current.value,
            brand: brandInput.current.value,
            description: descriptionInput.current.value,
            manufactor: manufacturerInput.current.value,
            name: nameInput.current.value,
            price: +priceInput.current.value,
            size: +sizeInput.current.value,
            sizeType: sizeTypeInput.current.value,
            typeOfCare: checkedTypesOfCare,
            productCount: 1
        }

        if (Object.values(newProduct).some(item => item == '')) return


        localStorage.setItem('products', JSON.stringify([...products, newProduct]))
        dispatch({type: ProductActionTypes.CHANGE_PRODUCTS, payload: [...products, newProduct]})

        urlInput.current.value = ''
        barcodeInput.current.value = 0
        brandInput.current.value = ''
        descriptionInput.current.value = ''
        manufacturerInput.current.value = ''
        nameInput.current.value = ''
        priceInput.current.value = 0
        sizeInput.current.value = 0
        sizeTypeInput.current.value = ''
        checkedTypesOfCare = []
        try {
            let allCheckbox = checkbox.current.getElementsByTagName('*')
            for (let index in allCheckbox) {
                if (allCheckbox[index].tagName === 'INPUT')
                    allCheckbox[index].checked = false
            }
        } catch (error) {

        }
    }

    return (
        <div className={cl.changeCont}>
            <div className={cl.productInfo}>
                <div className={cl.left}>
                    <label htmlFor="name">Название:</label>
                    <input
                        ref={nameInput as any}
                        type="text"
                        id='name'
                    />

                    <label htmlFor="manufacturer">Производитель:</label>
                    <input
                        ref={manufacturerInput as any}
                        type="text"
                        id='manufacturer'
                    />

                    <label htmlFor="brand">Бренд:</label>
                    <input
                        ref={brandInput as any}
                        type="text"
                        id='brand'
                    />

                    <label htmlFor="price">Цена:</label>
                    <input
                        ref={priceInput as any}
                        type="text"
                        id='price'
                    />

                    <label htmlFor="description">Описание:</label>
                    <textarea
                        ref={descriptionInput as any}
                        id="description"
                    ></textarea>
                </div>
                <div className={cl.right}>
                    <label htmlFor="size">Размер:</label>
                    <input
                        ref={sizeInput as any}
                        type="text"
                        id='size'
                    />

                    <label htmlFor="sizetype">Тип размера:</label>
                    <input
                        ref={sizeTypeInput as any}
                        type="text"
                        id='sizetype'
                    />

                    <label htmlFor="url">URL Каринки:</label>
                    <input
                        ref={urlInput as any}
                        type="text"
                        id='url'
                    />

                    <label htmlFor="barcode">Бренд:</label>
                    <input
                        ref={barcodeInput as any}
                        type="text"
                        id='barcode'
                    />

                    <SlideBtn direction={'column'} label={'Тип ухода'}>
                        <div ref={checkbox as any} className={cl.typeOfCareCont}>
                            {filterTypes.map((filterType, index) =>
                                <div key={index} className={cl.typeOfCare}>
                                    <input
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
            <Button data-testid='admin-page-add-btn' onClick={() => addProduct()}>
                Add new product
            </Button>
        </div>
    );
};

export default AddCont;
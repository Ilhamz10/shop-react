import React from 'react';
import cl from './Bottom.module.css'
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';

const Bottom = () => {
    return (
        <div className={cl.bottom}>
            <div className="container">
                <div className={cl.cont}>
                    <div className={cl.first}>
                        <div className={cl.logo}>
                            <img src="/icons/white-main-log.png" alt="" />
                            <p>Компания «Султан» — снабжаем розничные магазины товарами
                                "под ключ" в Кокчетаве и Акмолинской области</p>
                        </div>
                        <div className={cl.input}>
                            <label>Подпишись на скидки и акции</label>
                            <Input placeholder='Введите ваш E-mail' />
                        </div>
                    </div>
                    <div>
                        <h2>Меню сайта:</h2>
                        <ul>
                            <li>О компании</li>
                            <li>Доставка и оплата</li>
                            <li>Возврат</li>
                            <li>Контакты</li>
                        </ul>
                    </div>
                    <div>
                        <h2>Категории:</h2>
                        <ul>
                            <li>Бытовая химия</li>
                            <li>Косметика и гигиена</li>
                            <li>Товары для дома</li>
                            <li>Товары для детей и мам</li>
                            <li>Посуда</li>
                        </ul>
                    </div>
                    <div>
                        <h2>Скачать прайс-лист:</h2>
                        <div className={cl.priceListCont}>
                            <div className={cl.btnCont}>
                                <Button>
                                    Прайс лист
                                    <img src="/icons/download-icon.png" alt="" />
                                </Button>
                            </div>
                            <span>Связь в мессенджерах:</span>
                            <div className={cl.icons}>
                                <img src="/icons/whatsapp-icon.png" alt="" />
                                <img src="/icons/telegram-icon.png" alt="" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2>Контакты:</h2>
                        <div className={cl.contacts}>
                            <div className={cl.phone}>
                                <p>+7 (777) 490-00-91</p>
                                <span>время работы: 9:00-20:00</span>
                                <a href="">Заказать звонок</a>
                            </div>

                            <div className={cl.mail}>
                                <h3>opt.sultan@mail.ru</h3>
                                <span>На связи в любое время</span>
                            </div>
                            <div className={cl.icons}>
                                <img src="/icons/visa.png" alt="" />
                                <img src="/icons/mastercard.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bottom;
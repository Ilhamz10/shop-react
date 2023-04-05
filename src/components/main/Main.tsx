import React, { useState } from 'react';
import MainHeader from './MainHeader/MainHeader';
import MainMain from './MainMain/MainMain';
import MainAside from './MainAside/MainAside';
import cl from './Main.module.css'


const Main = () => {
    let page: number
    function getProps(p: any){
        page = p
    }
    return (
        <main className='container catalog'>
            <MainHeader />
            <MainAside />
            <MainMain />
        </main>
    );
};

export default Main;
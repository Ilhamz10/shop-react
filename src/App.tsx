import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Basket from './components/basket/Basket';
import Header from './components/header/Header';
import Main from './components/main/Main';
import ProductPage from './components/productPage/ProductPage';
import Admin from './components/admin/Admin';
import Bottom from './components/bottom/Bottom';

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/basket' element={<Basket />} />
        <Route path='/product' element={<ProductPage />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
      <Bottom/>
    </div>
  );
};

export default App;
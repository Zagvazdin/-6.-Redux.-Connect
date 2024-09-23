// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import AddProduct from './AddProduct';
import ProductList from './ProductList';
import './App.css'; // Импортируйте файл стилей

const App = () => {
  return (
    <Provider store={store}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>Каталог продуктов</h1>
        <ProductList />
        <AddProduct />
      </div>
    </Provider>
  );
};

export default App;

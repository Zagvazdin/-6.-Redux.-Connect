// src/ProductList.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeProduct, toggleAvailability } from './store';
import './ProductList.css'; // Добавьте файл стилей

const ProductList = () => {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} className="product-image" />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Цена: {product.price} руб.</p>
          <p>Доступно: {product.available ? 'Да' : 'Нет'}</p>
          <button onClick={() => dispatch(removeProduct(product.id))}>Удалить</button>
          <button onClick={() => dispatch(toggleAvailability(product.id))}>
            {product.available ? 'Сделать недоступным' : 'Сделать доступным'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from './store';
import './ProductList.css'; // Импортируйте стили

const AddProduct = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({ name: '', description: '', price: '', available: true, image: '' });
  const [fileName, setFileName] = useState('');
  const [fileSelected, setFileSelected] = useState(true); // Состояние для проверки выбора файла

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = name === 'name' || name === 'description' ? capitalizeFirstLetter(value) : value;
    setProduct({ ...product, [name]: name === 'available' ? value === 'true' : formattedValue });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name); // Сохраняем имя файла
      setFileSelected(true); // Файл выбран
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct((prevProduct) => ({ ...prevProduct, image: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      setFileName(''); // Если файл не выбран, сбрасываем имя
      setFileSelected(false); // Файл не выбран
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fileName) { // Проверяем, выбран ли файл перед отправкой
      dispatch(addProduct({ ...product, id: Date.now() }));
      setProduct({ name: '', description: '', price: '', available: true, image: '' });
      setFileName(''); // Сбрасываем имя файла после отправки
      setFileSelected(true); // Сбрасываем состояние выбора файла
    }
  };

  return (
    <div className="product-card add-product-card">
      <form onSubmit={handleSubmit}>
        <input name="name" value={product.name} onChange={handleChange} placeholder="Имя продукта" required />
        <input name="description" value={product.description} onChange={handleChange} placeholder="Описание" required />
        <input name="price" value={product.price} onChange={handleChange} placeholder="Цена" required type="number" />
        
        <label className="file-upload">
          <input type="file" onChange={handleFileChange} accept="image/*" required />
          Добавить фото
        </label>
        {!fileSelected && <p style={{ color: 'red' }}>Пожалуйста, выберите файл.</p>} {/* Подсказка, если файл не выбран */}

        <select name="available" value={product.available} onChange={handleChange}>
          <option value="true">Доступно</option>
          <option value="false">Недоступно</option>
        </select>

        <button type="submit">Добавить продукт</button>
      </form>
    </div>
  );
};

export default AddProduct;

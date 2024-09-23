// src/store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Начальное состояние с пятью продуктами по умолчанию и изображениями
const initialState = {
  products: [
    { id: 1, name: 'Картофель', description: 'Белый', price: 50, available: true, image: 'https://avatars.mds.yandex.net/i?id=a36c6f642491a856b36e5c922e7f27697b85b129-8313048-images-thumbs&n=13' },
    { id: 2, name: 'Огурцы', description: 'Пупырчетый', price: 200, available: true, image: 'https://avatars.mds.yandex.net/i?id=d6d527a3dff2301700deb7ff98f8b805dcc98005725eb42a-5286981-images-thumbs&n=13' },
    { id: 3, name: 'Клубника', description: 'Крупная', price: 1000, available: false, image: 'https://avatars.mds.yandex.net/i?id=cea274202ef5021ef2522fc85ad1c3915b7db26a-8961207-images-thumbs&n=13' },
    { id: 5, name: 'Чеснок', description: 'Ядрен', price: 500, available: false, image: 'https://avatars.mds.yandex.net/i?id=c54b81ed1f5fd6a9742463ba9ebe8eecd34dce3f-6942344-images-thumbs&n=13' },
  ],
};

// Создание слайса
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    toggleAvailability: (state, action) => {
      const product = state.products.find(product => product.id === action.payload);
      if (product) {
        product.available = !product.available;
      }
    },
  },
});

// Экспорт действий
export const { addProduct, removeProduct, updateProduct, toggleAvailability } = productSlice.actions;

// Создание хранилища
const store = configureStore({
  reducer: {
    products: productSlice.reducer,
  },
});

export default store;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';
import { RootState } from '../../app/store';

interface BasketItem {
  product: Product;
  quantity: number;
}

interface BasketState {
  items: BasketItem[];
}

const loadBasketFromLocalStorage = (): BasketItem[] => {
  const basket = localStorage.getItem('basket');
  return basket ? JSON.parse(basket) : [];
};

const saveBasketToLocalStorage = (basket: BasketItem[]) => {
  localStorage.setItem('basket', JSON.stringify(basket));
};

const initialState: BasketState = {
  items: loadBasketFromLocalStorage(),
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.product.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
      saveBasketToLocalStorage(state.items);
    },
    removeFromBasket: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.product.id !== action.payload);
      saveBasketToLocalStorage(state.items);
    },
    clearBasket: (state) => {
      state.items = [];
      saveBasketToLocalStorage(state.items);
    },
  },
});

export const { addToBasket, removeFromBasket, clearBasket } = basketSlice.actions;
export const selectBasket = (state: RootState) => state.basket;
export default basketSlice.reducer;
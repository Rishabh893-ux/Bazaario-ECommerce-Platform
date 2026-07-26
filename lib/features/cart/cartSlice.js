// lib/features/cart/cartSlice.js
import { createSlice, createSelector } from "@reduxjs/toolkit";

// Cart lives in Redux only (no localStorage) — it's rebuilt from the
// server's product data on checkout anyway, so client persistence
// isn't load-bearing; keeping it in memory avoids stale price/stock
// data surviving a browser restart.
const initialState = {
  // itemsById: { [productId]: { productId, name, price, image, vendorId, vendorName, quantity } }
  itemsById: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { productId, name, price, image, vendorId, vendorName } = action.payload;
      if (state.itemsById[productId]) {
        state.itemsById[productId].quantity += 1;
      } else {
        state.itemsById[productId] = { productId, name, price, image, vendorId, vendorName, quantity: 1 };
      }
    },
    incrementItem(state, action) {
      const item = state.itemsById[action.payload];
      if (item) item.quantity += 1;
    },
    decrementItem(state, action) {
      const item = state.itemsById[action.payload];
      if (item && item.quantity > 1) item.quantity -= 1;
      else if (item) delete state.itemsById[action.payload];
    },
    removeItem(state, action) {
      delete state.itemsById[action.payload];
    },
    clearCart(state) {
      state.itemsById = {};
    },
  },
});

export const { addToCart, incrementItem, decrementItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

const selectCartItemsById = (state) => state.cart.itemsById;

export const selectCartItems = createSelector(
  [selectCartItemsById],
  (itemsById) => Object.values(itemsById)
);

export const selectCartSubtotal = createSelector(
  [selectCartItems],
  (items) => items.reduce((sum, i) => sum + i.price * i.quantity, 0)
);

export const selectCartCount = createSelector(
  [selectCartItems],
  (items) => items.reduce((sum, i) => sum + i.quantity, 0)
);

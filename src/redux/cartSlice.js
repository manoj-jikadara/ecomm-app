import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    wishList: [],
  },
  reducers: {
    addItemToCart(state, action) {
      const existingItem = state.cartItems.find(
        (item) => item.productId === action.payload.productId
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cartItems.push(action.payload);
      }
    },
    removeItemFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload.productId
      );
    },
    increaseItemQuantity(state, action) {
      const item = state.cartItems.find(
        (item) => item.productId === action.payload.productId
      );
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseItemQuantity(state, action) {
      const item = state.cartItems.find(
        (item) => item.productId === action.payload.productId
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter(
          (item) => item.productId !== action.payload.productId
        );
      }
    },
    addItemToWishList(state, action) {
      state.wishList.push(action.payload);
    },
    removeItemFromWishList(state, action) {
      state.wishList = state.wishList.filter(
        (item) => item.productId !== action.payload.productId
      );
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  addItemToWishList,
  removeItemFromWishList,
} = cartSlice.actions;

export default cartSlice.reducer;

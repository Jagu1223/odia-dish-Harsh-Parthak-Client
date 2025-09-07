import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};
//cart Slice

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,

  reducers: {
    //addToCart:-
    addToCart: (state, action) => {
      console.log("action", action);
      const IteamIndex = state.cart.findIndex(
        (iteam) => iteam.id === action.payload.id
      );
      console.log(IteamIndex);
      if (IteamIndex >= 0) {
        state.cart[IteamIndex].qnty += 1;
      } else {
        const temp = { ...action.payload, qnty: 1 };
        state.cart = [...state.cart, temp];
      }
    },
    //RemoveFromCart:-
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      console.log("remove", action);
    },

    //Remove Single item
    removeSingleItem: (state, action) => {
      const ItemIndex_dec = state.cart.findIndex(
        (iteam) => iteam.id === action.payload.id
      );
      if (state.cart[ItemIndex_dec].qnty >= 1) {
        state.cart[ItemIndex_dec].qnty -= 1;
      }
    },

    //ClearCart
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, removeSingleItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

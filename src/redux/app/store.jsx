import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cartSlice";

const store = configureStore({
  reducer: {
    allcart: cartSlice,
  },
});

export default store;

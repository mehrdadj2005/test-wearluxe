import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/app/cart/cartSlice";
import { loadCartFromLocalStorage } from "@/helper/localStorage";

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: {
      cart: {
        cart: loadCartFromLocalStorage(),
      },
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

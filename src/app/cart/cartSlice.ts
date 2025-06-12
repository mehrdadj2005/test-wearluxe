import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICart {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  image: string;
  imageTitle: string;
  size: string;
}

export interface IInitialState {
  cart: ICart[];
}

const initialState: IInitialState = {
  cart:
    typeof window !== "undefined" && JSON.parse(localStorage.getItem("cart")!)
      ? JSON.parse(localStorage.getItem("cart")!)
      : [],
};

const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    addProduct(state, action: PayloadAction<ICart>) {
      const existingItem = state.cart.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.size === action.payload.size
      );

      if (existingItem) {
        // Update quantity and total price if the product with the same size exists
        existingItem.quantity += action.payload.quantity;
        existingItem.totalPrice += action.payload.totalPrice;
      } else {
        // Add new product variation to the cart
        state.cart.push(action.payload);
      }
    },

    removeProduct(state, action: PayloadAction<ICart>) {
      state.cart = state.cart.filter(
        (product) =>
          product.productId !== action.payload.productId ||
          product.size !== action.payload.size
      );
    },

    increaseItemQuantity(state, action: PayloadAction<ICart>) {
      const product = state.cart.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.size === action.payload.size
      );
      if (product) {
        product.quantity++;
        product.totalPrice = product.quantity * product.unitPrice;
      }
    },

    decreaseItemQuantity(state, action: PayloadAction<ICart>) {
      const product = state.cart.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.size === action.payload.size
      );
      if (product) {
        product.quantity--;
        product.totalPrice = product.quantity * product.unitPrice;

        if (product.quantity === 0) {
          cartSlice.caseReducers.removeProduct(state, action);
        }
      }

      // adding state to localStorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    clearCart(state) {
      state.cart = [];
    },
    loadCartFromStorage(state, action: PayloadAction<ICart[]>) {
      state.cart = action.payload;
    },
  },
});

export const {
  addProduct,
  removeProduct,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
  loadCartFromStorage,
} = cartSlice.actions;
export default cartSlice.reducer;

/**
 * Calculates the total quantity of items in the cart.
 *
 * @param state - An array of cart items where each item includes a quantity property.
 * @returns The cumulative sum of the quantities of all items in the state.
 */
export const getTotalCartQuantity = (state: { cart: IInitialState }) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

/**
 * Calculates the total price of all items in the cart.
 *
 * This function iterates over an array of cart items and sums their `totalPrice` values.
 *
 * @param state - An array of objects conforming to the IInitialState interface, each representing a cart item.
 * @returns The aggregate sum of the total prices of all items in the cart.
 */
export const getTotalCartPrice = (state: { cart: IInitialState }) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

/**
 * Retrieves the cart state.
 *
 * @remarks
 * This function takes an array of initial state objects and returns the same array.
 *
 * @param state - An array containing the initial state objects.
 * @returns The provided cart state array.
 */
export const getCart = (state: { cart: IInitialState }) => state.cart.cart;

/**
 * Creates a selector function to retrieve the current quantity of a product by its ID.
 *
 * This function takes a product ID as input and returns another function that, when provided
 * with an array of state items, searches for an item with a matching productId. If found, it
 * returns the item's quantity; otherwise, it returns 0.
 *
 * @param id - The unique identifier for the product.
 * @returns A selector function that accepts the state array and returns the quantity associated with the productId, or 0 if the product is not found.
 */
export const getCurrentQuantityById =
  (product: ICart) => (state: { cart: IInitialState }) =>
    state.cart.cart.find(
      (item) =>
        item.productId === product.productId && item.size === product.size
    )?.quantity ?? 0;

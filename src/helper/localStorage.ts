import { ICart } from "@/app/cart/cartSlice";

// for saving product to localStorage
export const saveCartToLocalStorage = (cartItem: ICart[]) => {
  try {
    if (typeof window !== "undefined")
      localStorage.setItem("cart", JSON.stringify(cartItem));
  } catch (error) {
    console.error("Error saving cart to local storage", error);
  }
};

// for loading product from localStorage
export const loadCartFromLocalStorage = () => {
  try {
    if (typeof window !== "undefined") {
      const cart = localStorage.getItem("cart");
      return cart ? JSON.parse(cart) : [];
    }
    return [];
  } catch (error) {
    console.error("Error loading cart from local storage", error);
    return [];
  }
};

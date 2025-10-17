import { createSlice } from "@reduxjs/toolkit";

const loadCart = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  }
  return [];
};

const saveCart = (cart) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

const initialState = {
  cart: loadCart(), 
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const newProduct = action.payload;
      const existingProduct = state.cart.find(
        (item) => item.id === newProduct.id && item.size === newProduct.size
      );

      if (existingProduct) {
        existingProduct.quantity += newProduct.quantity || 1;
      } else {
        state.cart.push({
          ...newProduct,
          quantity: 1,
        });
      }

      saveCart(state.cart);
    },

    removeProduct: (state, action) => {
      const { id, size } = action.payload;
      state.cart = state.cart.filter(
        (item) => !(item.id === id && item.size === size)
      );
      saveCart(state.cart);
    },

    updateQuantity: (state, action) => {
      const { id, size, quantity } = action.payload;
      const product = state.cart.find(
        (item) => item.id === id && item.size === size
      );

      if (product) {
        product.quantity = quantity > 0 ? quantity : 1;
      }

      saveCart(state.cart); 
    },

    clearCart: (state) => {
      state.cart = [];
      saveCart(state.cart); 
    },
  },
});

export const { addProduct, removeProduct, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;

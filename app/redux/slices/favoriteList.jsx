import { createSlice } from "@reduxjs/toolkit";

const loadList = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("favoriteList");
    return stored ? JSON.parse(stored) : [];
  }
  return [];
};

const saveFavoriteList = (list) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("favoriteList", JSON.stringify(list));
  }
};

const initialState = {
  favoriteList: loadList(),
};

const favoriteSlice = createSlice({
  name: "favoriteList",
  initialState,
  reducers: {
    addProductToFavoriteList: (state, action) => {
      const newProduct = action.payload;
      const existingProduct = state.favoriteList.find(
        (item) => item.id === newProduct.id
      );

      if (!existingProduct) {
        state.favoriteList.push(newProduct);
        saveFavoriteList(state.favoriteList);
      }
    },

    removeProductFromFavoriteList: (state, action) => {
      const { id } = action.payload;
      state.favoriteList = state.favoriteList.filter(
        (item) => item.id !== id
      );
      saveFavoriteList(state.favoriteList);
    },

    clearFavoriteList: (state) => {
      state.favoriteList = [];
      saveFavoriteList(state.favoriteList);
    },
  },
});

export const { 
  addProductToFavoriteList, 
  removeProductFromFavoriteList, 
  clearFavoriteList 
} = favoriteSlice.actions;

export default favoriteSlice.reducer;

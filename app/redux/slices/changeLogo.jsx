import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  changeLogo: false,
};

export const changeSlice = createSlice({
  name: 'changeLogo',
  initialState,
  reducers: {
    toggleLogo: (state) => {
      state.changeLogo = !state.changeLogo;
    },
    setLogo: (state, action) => {
      state.changeLogo = action.payload;
    },
  },
});

export const { toggleLogo, setLogo } = changeSlice.actions;

export default changeSlice.reducer;

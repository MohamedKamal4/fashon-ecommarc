// app/store.js
import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../../redux/slices/loginSlice'
import addReducer from '../../redux/slices/addProduct'
import favoriteReducer from '../../redux/slices/favoriteList'
import changeLogoReducer from '../../redux/slices/changeLogo'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    addProduct: addReducer,
    favoriteList: favoriteReducer,
    isChange: changeLogoReducer
  },
})

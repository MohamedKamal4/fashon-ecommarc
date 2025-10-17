import { createSlice } from '@reduxjs/toolkit'

const getStoredUser = () => {
  if (typeof window !== "undefined") { 
    const localUser = localStorage.getItem('user')
    const sessionUser = sessionStorage.getItem('user')
    if (localUser) return JSON.parse(localUser)
    if (sessionUser) return JSON.parse(sessionUser)
  }
  return null
}

const initialState = {
  data: getStoredUser(),   
  isAuthenticated: !!getStoredUser() 
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    // تسجيل الدخول
    login: (state, action) => {
      state.data = action.payload
      state.isAuthenticated = true

      if (typeof window !== "undefined") {
        if (action.payload.remember) {
          localStorage.setItem('user', JSON.stringify(action.payload))
        } else {
          sessionStorage.setItem('user', JSON.stringify(action.payload))
        }
      }
    },

    // تسجيل الخروج
    logout: (state) => {
      state.data = null
      state.isAuthenticated = false

      if (typeof window !== "undefined") {
        localStorage.removeItem('user')
        sessionStorage.removeItem('user')
      }
    },
  }
})

export const { login, logout } = loginSlice.actions
export default loginSlice.reducer

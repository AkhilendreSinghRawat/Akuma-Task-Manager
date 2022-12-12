import { createSlice } from '@reduxjs/toolkit'

export const userData = createSlice({
  name: 'userData',
  initialState: {
    token: null,
  },
  reducers: {
    setUserData: (state, action) => {
      console.log('🚀 ~ file: modeSlice.jsx:15 ~ action', action)
      state = { ...action }
      return state
    },
  },
})

export const { setUserData } = userData.actions

export default userData.reducer

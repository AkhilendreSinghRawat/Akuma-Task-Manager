import { configureStore } from '@reduxjs/toolkit'
import sideBarData from './slices/sideBarSlice'

export const store = configureStore({
  reducer: {
    sideBarData,
  },
})

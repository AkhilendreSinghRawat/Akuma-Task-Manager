import { configureStore } from '@reduxjs/toolkit'
import sideBarData from './slices/sideBarSlice'
import searchNavbarData from './slices/searchNavbarSlice'

export const store = configureStore({
  reducer: {
    sideBarData,
    searchNavbarData,
  },
})

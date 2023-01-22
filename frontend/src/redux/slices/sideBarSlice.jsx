import { createSlice } from '@reduxjs/toolkit'

export const sideBarData = createSlice({
  name: 'sideBarData',
  initialState: {
    selectedCardIndex: 0,
    isHomePage: false,
  },
  reducers: {
    setSelectedCardIndex: (state, action) => {
      state.selectedCardIndex = action.payload
    },
    setIsHomePage: (state, action) => {
      state.isHomePage = action.payload
    },
  },
})

export const { setSelectedCardIndex, setIsHomePage } = sideBarData.actions

export default sideBarData.reducer

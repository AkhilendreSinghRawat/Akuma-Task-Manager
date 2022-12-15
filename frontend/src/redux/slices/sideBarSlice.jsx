import { createSlice } from '@reduxjs/toolkit'

export const sideBarData = createSlice({
  name: 'sideBarData',
  initialState: {
    selectedCardIndex: 0,
  },
  reducers: {
    setSelectedCardIndex: (state, action) => {
      state.selectedCardIndex = action.payload
    },
  },
})

export const { setSelectedCardIndex } = sideBarData.actions

export default sideBarData.reducer

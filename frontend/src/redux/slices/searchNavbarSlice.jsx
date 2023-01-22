import { createSlice } from '@reduxjs/toolkit'

export const searchNavbarData = createSlice({
  name: 'searchNavbarData',
  initialState: {
    projectSearchName: '',
  },
  reducers: {
    setProjectSearchName: (state, action) => {
      state.projectSearchName = action.payload
    },
  },
})

export const { setProjectSearchName } = searchNavbarData.actions

export default searchNavbarData.reducer

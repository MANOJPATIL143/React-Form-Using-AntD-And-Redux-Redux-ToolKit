// formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    saveFormData(state, action) {
      state.formData = action.payload;
    },
  },
});

export const { saveFormData } = formSlice.actions;
export const selectFormData = state => state.form.formData;
export default formSlice.reducer;

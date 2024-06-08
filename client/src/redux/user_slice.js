import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  points: 5000,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    addPoints: (state, action) => {
      state.points += action.payload;
    },
  },
});

export const { setName, addPoints } = userSlice.actions;
export default userSlice.reducer;

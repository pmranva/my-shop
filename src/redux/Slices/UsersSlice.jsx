import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { users: [] },
  reducers: {
    store_users(state, action) {
      state.users = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { store_users } = userSlice.actions;
export const selectUser = (state) => state.user.users;

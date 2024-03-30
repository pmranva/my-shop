import { createSlice } from "@reduxjs/toolkit";

let filterSlice = createSlice({
  name: "filter",
  initialState: { fliterProducts: [] },
  reducers: {
    fliter_by_search(state, action) {
      console.log(action.payload);
      let { products, search } = action.payload;
      let fproducts = products.filter((item) =>  item.name.includes(search)
      || item.category.includes(search));
      state.fliterProducts = fproducts;
    },
  },
});
export const { fliter_by_search } = filterSlice.actions;
export default filterSlice.reducer;
export const selectFliterProducts = (state) => state.filter.fliterProducts;

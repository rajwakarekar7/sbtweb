"use client";
import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage?.getItem("user");
   const datauser =  JSON?.parse(user)
    // Check if localStorage is available
    const storedCart = localStorage?.getItem(`${datauser?.email}`);
    return JSON?.parse(storedCart) || [];
  } else {
    return [];
  }
};

const initialState = getInitialState();

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    AddToCart(state, action) {
      const ItemIndex = state.findIndex(
        (i) =>
          i?.id === action.payload?.id &&
          i?.selWght === action?.payload?.selWght
      );
      if (ItemIndex >= 0 && action.payload?.stock > state[ItemIndex]?.qnt) {
        state[ItemIndex] = {
          ...state[ItemIndex],
          qnt: state[ItemIndex].qnt + 1,
        };
      } else if (ItemIndex === -1) {
        let tempData = {
          ...action.payload,
          qnt: action.payload?.stock > 0 ? 1 : 0,
        };
        state.push(tempData);
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },

    DecreseProQnt(state, action) {
      const ItemIndex = state?.findIndex(
        (i) =>
          i?.id === action.payload.id && i?.selWght === action.payload?.selWght
      );
      if (ItemIndex >= 0 && action.payload?.qnt > 1) {
        state[ItemIndex].qnt -= 1;
      } else if (ItemIndex >= 0 && state[ItemIndex].qnt === 1) {
        // state.splice(ItemIndex, 1);
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    RemovePro(state, action) {
      const ItemIndex = state?.findIndex(
        (i) =>
          i?.id === action.payload.id && i?.selWght === action.payload.selWght
      );
      state.splice(ItemIndex, 1);
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export default CartSlice.reducer;

export const { AddToCart, IncreaseProQnt, DecreseProQnt, RemovePro } =
  CartSlice.actions;

import {createSlice} from "@reduxjs/toolkit";

export const hamburgerMenuSlice = createSlice({
    name: "hamburgerMenuReducer",
    initialState: {
        isOpen: false
    }, reducers: {
        updateHamburgerMenu: (state, action) => {
            state.isOpen = action.payload;
        }
    }
});

export const {updateHamburgerMenu} = hamburgerMenuSlice.actions;

export default hamburgerMenuSlice.reducer;
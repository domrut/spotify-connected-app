import {createSlice} from "@reduxjs/toolkit";

export const hamburgerMenuSlice = createSlice({
    name: "hamburgerMenuReducer",
    initialState: {
        isOpen: false,
        modalOpen: false,
    }, reducers: {
        updateHamburgerMenu: (state, action) => {
            state.isOpen = action.payload;
        },
        updateModalMenu: (state, action) => {
            state.modalOpen = action.payload;
        }
    }
});

export const {updateModalMenu,updateHamburgerMenu} = hamburgerMenuSlice.actions;

export default hamburgerMenuSlice.reducer;
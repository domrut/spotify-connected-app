import {createSlice} from "@reduxjs/toolkit";

export const spotifySlice = createSlice({
    name: "spotifyReducer",
    initialState: {
        error: {},
        isLoggedIn: false,
        playlists: [],
        tracks: [],
    }, reducers: {
        updateError: (state, action) => {
            state.error = action.payload;
        },
        updatePlaylists: (state, action) => {
            state.playlists = action.payload;
        },
        updateTracks: (state, action) => {
            state.tracks = action.payload;
        },
        updateAuth: (state, action) => {
            state.isLoggedIn = action.payload;
        }
    }
});

export const {updateAuth, updateError, updateTracks,updatePlaylists} = spotifySlice.actions;

export default spotifySlice.reducer;
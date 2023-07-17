import {createSlice} from "@reduxjs/toolkit";

export const spotifySlice = createSlice({
    name: "spotifyReducer",
    initialState: {
        error: {},
        isLoggedIn: false,
        playlists: [],
        tracks: [],
        searchResult: [],
        recentSearches: []
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
        },
        updateSearchResults: (state, action) => {
            state.searchResult = action.payload;
        },
        updateRecentSearches: (state, action) => {
            const searchesArray = state.recentSearches;
            if (searchesArray.filter(item => item === action.payload).length === 1) {
                state.recentSearches = searchesArray;
            } else {
                if (searchesArray.length === 5) {
                    searchesArray.pop();
                }
                searchesArray.unshift(action.payload);
                state.recentSearches = searchesArray;
            }
        }
    }
});

export const {updateRecentSearches, updateSearchResults,updateAuth, updateError, updateTracks,updatePlaylists} = spotifySlice.actions;

export default spotifySlice.reducer;
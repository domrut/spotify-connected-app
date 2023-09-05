import {createSlice} from "@reduxjs/toolkit";

export const spotifySlice = createSlice({
    name: "spotifyReducer",
    initialState: {
        error: {},
        isLoggedIn: false,
        currentUser: {},
        playlists: [],
        tracks: [],
        trackURIs: [],
        tracksAudioData: [],
        searchResult: [],
        recentSearches: [],
        additionalSearches: [],
        artistAlbums: [],
        selectedTrackURIs: JSON.parse(localStorage.getItem("selectedTracks") || "[]")
    }, reducers: {
        updateError: (state, action) => {
            state.error = action.payload;
        },
        updateCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
        updatePlaylists: (state, action) => {
            state.playlists = action.payload;
        },
        updateTracks: (state, action) => {
            state.tracksAudioData = [];
            state.tracks = action.payload;
        },
        updateTrackURIs: (state, action) => {
            state.trackURIs = action.payload;
        },
        updateTracksAudioData: (state, action) => {
            state.tracksAudioData = action.payload;
        },
        updateAuth: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        updateSearchResults: (state, action) => {
            state.additionalSearches = [];
            state.searchResult = action.payload;
        },
        addSearchResults: (state, action) => {
            if (state.additionalSearches.length >= Object.values(state.searchResult)[0].total) return;
            state.searchResult = action.payload;
            Object.values(state.searchResult)[0].items = [...Object.values(state.searchResult)[0].items, ...Object.values(action.payload)[0].items]
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
        },
        updateArtistAlbums: (state, action) => {
            state.artistAlbums = action.payload;
        },
        updateSelectedTrackURIs: (state, action) => {
            let stateCopy = JSON.parse(localStorage.getItem("selectedTracks") || "[]");
            if (stateCopy.filter(item => item === action.payload).length === 1) {
                stateCopy = stateCopy.filter(item => !item.includes(action.payload))
            } else if (action.payload.length === 0) {
                stateCopy = []
            } else {
                stateCopy.push(action.payload)
            }
            state.selectedTrackURIs = stateCopy;
            localStorage.setItem("selectedTracks", JSON.stringify(stateCopy))
        }
    }
});

export const {
    updateCurrentUser,
    updateSelectedTrackURIs,
    updateArtistAlbums,
    updateTracksAudioData,
    updateTrackURIs,
    addSearchResults,
    updateRecentSearches,
    updateSearchResults,
    updateAuth,
    updateError,
    updateTracks,
    updatePlaylists
} = spotifySlice.actions;

export default spotifySlice.reducer;
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux"
import App from './App';
import reportWebVitals from './reportWebVitals';
import spotifyReducer from "./features/spotifyStore";
import hamburgerMenuReducer from "./features/hamburgerMenuStore";
import {BrowserRouter} from "react-router-dom";

const store = configureStore({
    reducer: {
        spotifyStore: spotifyReducer,
        hamburgerMenuStore: hamburgerMenuReducer
    }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    // </React.StrictMode>
);

reportWebVitals();

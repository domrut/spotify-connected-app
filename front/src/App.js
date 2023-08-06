import {useDispatch, useSelector} from "react-redux";
import Layout from "./pages/Layout";
import React, {useEffect, useState} from "react";
import "./index.css"
import {updateAuth} from "./features/spotifyStore";
import {useNavigate} from "react-router";

function App() {
    const store = useSelector(store => store.spotifyStore);
    const dispatch = useDispatch();
    const nav = useNavigate();

    useEffect(() => {
        localStorage.getItem("token") && dispatch(updateAuth(true))
        if (store.error.message === "The access token expired") {
            localStorage.removeItem("token");
            nav("/")
        }
    }, [store.error])

    useEffect(() => {
        const element = document.getElementsByTagName("html");
        if (localStorage.getItem("darkMode") === null) {
            element[0].classList.add("light");
            localStorage.setItem("darkMode", "light")
        } else if (localStorage.getItem("darkMode") === "light") {
            element[0].classList.add("light");
        } else {
            element[0].classList.remove("light");
            element[0].classList.add("dark");
            localStorage.setItem("darkMode", "dark")
        }
    }, [])

    return (
        <Layout store={store}/>
    );
}

export default App;

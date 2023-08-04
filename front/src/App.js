import {useDispatch, useSelector} from "react-redux";
import Layout from "./pages/Layout";
import React, {useEffect} from "react";
import "./index.css"
import {updateAuth} from "./features/spotifyStore";
import {useNavigate} from "react-router";

function App() {
    const store = useSelector(store => store.spotifyStore);
    const dispatch = useDispatch();
    const nav = useNavigate();

    useEffect(() => {
        sessionStorage.getItem("token") && dispatch(updateAuth(true))
        if (store.error.message === "The access token expired") {
            sessionStorage.clear();
            nav("/")
        }
    }, [store.error])

    return (
        <Layout store={store}/>
    );
}

export default App;
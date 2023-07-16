import {useDispatch, useSelector} from "react-redux";
import Layout from "./pages/Layout";
import React, {useEffect} from "react";
import "./index.css"
import {updateAuth} from "./features/spotifyStore";
import {useNavigate} from "react-router";
function App() {
    const store = useSelector(store => store.spotifyStore);
    const nav = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        sessionStorage.getItem("token") && dispatch(updateAuth(true))
        store.error.message === "The access token expired" && sessionStorage.clear();
        !sessionStorage.getItem("token") && nav("/");
    }, [])

    return (
        <>
            <Layout store={store}/>
            {console.log(store)}
        </>
    );
}

export default App;

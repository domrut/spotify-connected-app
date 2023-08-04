import {useDispatch, useSelector} from "react-redux";
import Layout from "./pages/Layout";
import React, {useEffect} from "react";
import "./index.css"
import {updateAuth} from "./features/spotifyStore";
function App() {
    const store = useSelector(store => store.spotifyStore);
    const dispatch = useDispatch();

    useEffect(() => {
        sessionStorage.getItem("token") && dispatch(updateAuth(true))
    }, [])

    return (
        <>
            <Layout store={store}/>
        </>
    );
}

export default App;
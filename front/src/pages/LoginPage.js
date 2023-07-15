import React, {useEffect} from 'react';
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {updateAuth} from "../features/spotifyStore";

function LoginPage({store}) {
    const nav = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (window.location.pathname.includes("auth=loggedIn/")) {
            const trimmedToken = window.location.pathname.split("auth=loggedIn/")[1];
            sessionStorage.setItem("token", trimmedToken)
            dispatch(updateAuth(true));
            nav("my-library")
        }
    }, [])
    const loginHandler = () => {
        window.location.href = "http://192.168.0.108:3002/login"
    }
    const logoutHandler = () => {
        sessionStorage.clear();
        dispatch(updateAuth(false));
        nav("/")
    }

    return (
        <div>
            {store.isLoggedIn ?
                <button onClick={logoutHandler}>Logout</button> :
                <button onClick={loginHandler}>Login</button>}
        </div>
    );
}

export default LoginPage;
import React, {useEffect} from 'react';
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {updateAuth} from "../features/spotifyStore";
import {Button} from "../styled/Button.styled";

function Auth({store}) {
    const nav = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (window.location.pathname.includes("auth=loggedIn/")) {
            const trimmedToken = window.location.pathname.split("auth=loggedIn/")[1];
            sessionStorage.setItem("token", trimmedToken)
            dispatch(updateAuth(true));
            setTimeout(() => {
                nav("my-library")
            }, 1000)
        }
    }, [])
    const loginHandler = () => {
        window.location.href = "http://192.168.0.104:3002/login"
    }
    const logoutHandler = () => {
        sessionStorage.clear();
        dispatch(updateAuth(false));
        nav("/")
    }

    return (
        <div className="mt-20 sm:ml-20 sm:mt-0">
            {store.isLoggedIn ?
                <Button className="btn-nav" onClick={logoutHandler}>Logout</Button> :
                <Button className="btn-nav" onClick={loginHandler}>Login</Button>}
        </div>
    );
}

export default Auth;
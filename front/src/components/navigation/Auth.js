import React, {useEffect} from 'react';
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {updateAuth} from "../../features/spotifyStore";
import {Button} from "../../styled/Button.styled";
import Logout from "../../svgs/logout";

function Auth() {
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
        window.location.href = "http://192.168.0.105:3002/login"
    }
    const logoutHandler = () => {
        sessionStorage.clear();
        dispatch(updateAuth(false));
        nav("/")
    }

    return (
        <div className="mt-20 sm:ml-20 sm:mt-0 items-center">
            {sessionStorage.getItem("token") ?
                <Logout logoutHandler={logoutHandler}/> :
                <Button className="btn-nav" onClick={loginHandler}>Login</Button>}
        </div>
    );
}

export default Auth;
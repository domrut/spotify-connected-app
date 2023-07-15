import React, {useEffect} from 'react';
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {updateAuth} from "../features/spotifyStore";
import {Button} from "../styled/Button.styled";

function LoginPage({store}) {
    const nav = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (window.location.pathname.includes("auth=loggedIn/")) {
            const trimmedToken = window.location.pathname.split("auth=loggedIn/")[1];
            sessionStorage.setItem("token", trimmedToken)
            dispatch(updateAuth(true));
            setTimeout(() => {
                nav("my-library")
            }, 500)
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
        <div className="mx-2">
            {store.isLoggedIn ?
                <Button className="p-1 w-32 rounded-full font-semibold tracking-wider bg-transparent border-2 border-white hover:border-black hover:bg-white hover:text-black text-white" onClick={logoutHandler}>Logout</Button> :
                <Button className="p-1 w-32 rounded-full font-semibold tracking-wider bg-transparent border-2 border-white hover:border-black hover:bg-white hover:text-black text-white" onClick={loginHandler}>Login</Button>}
        </div>
    );
}

export default LoginPage;
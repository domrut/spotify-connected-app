import React from 'react';
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {updateAuth} from "../../features/spotifyStore";
import Logout from "../../svgs/logout";

function Auth() {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const logoutHandler = () => {
        localStorage.removeItem("token");
        dispatch(updateAuth(false));
        nav("/")
    }

    return (
        <div className="mt-20 sm:ml-5 sm:mt-0 items-center">
            {localStorage.getItem("token") ?
                <Logout logoutHandler={logoutHandler}/> :
                null}
        </div>
    );
}

export default Auth;

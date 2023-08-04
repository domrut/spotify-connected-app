import React, {useEffect} from 'react';
import SpotifyLogo from "../svgs/spotifyLogo";
import {Link} from "react-router-dom";
import NavLogo from "../svgs/navLogo";
import {updateAuth} from "../features/spotifyStore";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import TempoMachine from "../svgs/tempoMachine";
import TempoLine from "../svgs/tempoLine";
import HowItWorks from "../components/landing/HowItWorks";
import LandingFooter from "../components/landing/LandingFooter";

function Home() {
    const nav = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (window.location.pathname.includes("auth=loggedIn/")) {
            const trimmedToken = window.location.pathname.split("auth=loggedIn/")[1];
            sessionStorage.setItem("token", trimmedToken)
            dispatch(updateAuth(true));
            nav("search")
        }
    }, [])

    return (
        <>
            <div className="text-white h-full max-w-[1740px] overflow-hidden mx-auto px-[5%]">
                <div className="h-[80vh] sm:h-[98vh] relative">
                    <NavLogo login/>
                    <h1 className="text-[2rem] sm:text-[3rem] mt-20 sm:mt-44 mb-20 max-w-md sm:max-w-xl tracking-wide font-bold">Filter
                        songs by tempo and create your perfect playlist</h1>
                    <Link
                        className="flex items-center w-max 2xs:w-64 rounded-md p-4 border-black border-2 hover:bg-green-500 bg-green-700"
                        to={"https://filter-tempo.onrender.com/login"}>
                        <SpotifyLogo login/>
                        Connect <span className="hidden 2xs:inline ml-1.5">your Spotify</span></Link>
                    <div
                        className="hidden sm:block sm:absolute w-[250px] 1.5md:w-[350px] 1243scr:w-[550px] top-[40%] left-[60%] 1.5md:top-[40%] 1243scr:top-[25%] 1.5md:left-[55%] 1243scr:left-[60%]">
                        <TempoMachine/>
                        <TempoLine/>
                    </div>
                </div>
                <HowItWorks/>
            </div>
            <LandingFooter/>
        </>
    );
}

export default Home;
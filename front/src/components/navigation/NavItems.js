import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import Auth from "./Auth";
import {useDispatch, useSelector} from "react-redux";
import {updateHamburgerMenu} from "../../features/hamburgerMenuStore";
import LightMode from "../../svgs/lightMode";
import DarkMode from "../../svgs/darkMode";

function NavItems({store}) {
    const hamburgerMenuStore = useSelector(store => store.hamburgerMenuStore);
    const dispatch = useDispatch();
    const [isDark, setIsDark] = useState(true);
    const closeModal = () => {
        dispatch(updateHamburgerMenu(!hamburgerMenuStore.isOpen))
    }

    const changeLightMode = () => {
        const element = document.getElementsByTagName("html");
        if (element[0].classList[0] === "light") {
            element[0].classList.remove("light");
            element[0].classList.add("dark");
            setIsDark(false);
            localStorage.setItem("darkMode", "dark")
        } else if (element[0].classList[0] === "dark") {
            element[0].classList.remove("dark");
            element[0].classList.add("light");
            setIsDark(true);
            localStorage.setItem("darkMode", "light")
        }
    }

    useEffect(() => {
        if (localStorage.getItem("darkMode") === "light") setIsDark(true);
        if (localStorage.getItem("darkMode") === "dark") setIsDark(false);
    },[])

    return (
        <>
            {store.isLoggedIn &&
                <>
                    <NavLink onClick={closeModal} className="btn-nav" to="/search">
                        Search
                    </NavLink>
                    <NavLink onClick={closeModal} className="btn-nav" to="/my-library">
                        My Library
                    </NavLink>
                    <NavLink onClick={closeModal} className="btn-nav mt-4 sm:mt-0 sm:ml-2" to="/selectedSongs">
                        Selected
                    </NavLink>
                    <div onClick={changeLightMode}>
                        {isDark ? <LightMode/> : <DarkMode/>}
                    </div>
                </>
            }
            <Auth store={store}/>
        </>
    );
}

export default NavItems;
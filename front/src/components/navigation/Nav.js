import React, {useEffect} from 'react';
import {Menu, MobileMenu, Modal} from "../../styled/Header.styled";
import Hamburger from "./Hamburger";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import NavItems from "./NavItems";
import NavLogo from "../../svgs/navLogo";
import Backdrop from "../Backdrop";

function Nav({store}) {
    const hambStore = useSelector(store => store.hamburgerMenuStore);

    useEffect(() => {
        localStorage.getItem("token")
    }, [])

    return (
        <nav className="flex justify-between py-4 items-center section-styling mb-2">
            <div className="w-10 h-10">
                <NavLink to="/my-library">
                    <NavLogo/>
                </NavLink>
            </div>
            <Menu className="hidden sm:flex">
                <NavItems store={store}/>
            </Menu>
            <Backdrop store={hambStore}/>
            <Modal className="sm:hidden dark:bg-white" isOpen={hambStore.isOpen}>
                <MobileMenu>
                    <NavItems store={store}/>
                </MobileMenu>
            </Modal>
            <Hamburger/>
        </nav>
    );
}

export default Nav;
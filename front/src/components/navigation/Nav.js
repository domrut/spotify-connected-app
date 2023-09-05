import React, {useState} from 'react';
import {Menu, MobileMenu, Modal} from "../../styled/Header.styled";
import Hamburger from "./Hamburger";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import NavItems from "./NavItems";
import NavLogo from "../../svgs/navLogo";
import Backdrop from "../Backdrop";

function Nav({store}) {
    const hambStore = useSelector(store => store.hamburgerMenuStore);
    const [isDark, setIsDark] = useState(true);

    return (
        <nav className="flex justify-between py-4 items-center section-styling mb-2">
            <div className="w-10 h-10">
                <NavLink aria-label={"Home"} to="/my-library">
                    <NavLogo/>
                </NavLink>
            </div>
            <Menu className="hidden sm:flex items-center">
                <NavItems store={store} setIsDark={setIsDark} isDark={isDark}/>
            </Menu>
            <Backdrop store={hambStore}/>
            <Modal className="sm:hidden dark:bg-white" isOpen={hambStore.isOpen}>
                <MobileMenu>
                    <NavItems store={store} setIsDark={setIsDark} isDark={isDark}/>
                </MobileMenu>
            </Modal>
            <Hamburger/>
        </nav>
    );
}

export default Nav;

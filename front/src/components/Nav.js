import React, {useEffect} from 'react';
import LoginPage from "../pages/LoginPage";
import {Menu, MobileMenu, Modal} from "../styled/Header.styled";
import Hamburger from "./Hamburger";
import {useSelector} from "react-redux";

function Nav({store}) {
    const hambStore = useSelector(store => store.hamburgerMenuStore)
    return (
        <div className="flex justify-end py-2 bg-black">
            <Menu className="hidden sm:flex">
                <LoginPage store={store}/>
            </Menu>
            <Modal className="sm:hidden" isOpen={hambStore.isOpen}>
                <MobileMenu>
                    <LoginPage store={store}/>
                </MobileMenu>
            </Modal>
            <Hamburger/>
        </div>
    );
}

export default Nav;
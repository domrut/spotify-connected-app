import React from 'react';
import {HamburgerStyled} from "../../styled/Header.styled";
import {updateHamburgerMenu} from "../../features/hamburgerMenuStore";
import {useDispatch, useSelector} from "react-redux";
function Hamburger() {

    const dispatch = useDispatch();
    const store = useSelector(store => store.hamburgerMenuStore)

    return (
        <>
            <HamburgerStyled className="flex sm:hidden" onClick={() => dispatch(updateHamburgerMenu(!store.isOpen))} isOpen={store.isOpen}>
                <div className="dark:bg-black"></div>
                <div className="dark:bg-black"></div>
                <div className="dark:bg-black"></div>
            </HamburgerStyled>
        </>
    );
}

export default Hamburger;
import React from 'react';
import {useDispatch} from "react-redux";
import {updateHamburgerMenu} from "../features/hamburgerMenuStore";

function Backdrop({store}) {
    const dispatch = useDispatch();
    return (
        <>
            {store.isOpen ?
                <div onClick={() => dispatch(updateHamburgerMenu(!store.isOpen))} className="top-0 bottom-0 right-0 left-0 z-20 absolute sm:hidden bg-black opacity-70"></div>
            : null}
        </>
    );
}

export default Backdrop;
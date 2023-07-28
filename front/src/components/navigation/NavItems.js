import React from 'react';
import {NavLink} from "react-router-dom";
import Auth from "./Auth";
import {useDispatch, useSelector} from "react-redux";
import {updateHamburgerMenu} from "../../features/hamburgerMenuStore";

function NavItems({store}) {
    const hamburgerMenuStore = useSelector(store => store.hamburgerMenuStore);
    const dispatch = useDispatch();
    const closeModal = () => {
        dispatch(updateHamburgerMenu(!hamburgerMenuStore.isOpen))
    }

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
                </>
            }
            <Auth store={store}/>
        </>
    );
}

export default NavItems;
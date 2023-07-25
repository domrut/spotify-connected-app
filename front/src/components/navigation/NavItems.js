import React from 'react';
import {NavLink} from "react-router-dom";
import Auth from "./Auth";

function NavItems({store}) {
    return (
        <>
            {store.isLoggedIn &&
                <>
                    <NavLink className="btn-nav" to="/search">
                        Search
                    </NavLink>
                    <NavLink className="btn-nav" to="/my-library">
                        My Library
                    </NavLink>
                    <NavLink className="btn-nav sm:ml-2" to="/selectedSongs">
                        Selected
                    </NavLink>
                </>
            }
            <Auth store={store}/>
        </>
    );
}

export default NavItems;
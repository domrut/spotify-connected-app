import React from 'react';
import LoginPage from "../pages/LoginPage";

function Nav({store}) {
    return (
        <div>
            <LoginPage store={store}/>
        </div>
    );
}

export default Nav;
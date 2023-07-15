import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router";
import {Outlet} from "react-router-dom";
import Playlists from "../components/Playlists";
import Tracks from "../components/Tracks";
import Nav from "../components/Nav";

function Layout({store}) {
    return (
        <div>
            <Nav store={store}/>
            <Routes>
                <Route path="/my-library"
                       element={(
                           <>
                               <Playlists store={store}/>
                               <Outlet/>
                           </>)}>
                    <Route path="/my-library/playlist/:id/tracks" element={<Tracks store={store}/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default Layout;
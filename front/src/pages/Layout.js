import React from 'react';
import {Route, Routes} from "react-router";
import {Outlet} from "react-router-dom";
import Playlists from "../components/Playlists";
import Tracks from "../components/Tracks";
import Nav from "../components/Nav";
import Error404 from "../components/error404";
import Home from "../components/Home";
import Loader from "../components/Loader";

function Layout({store}) {
    return (
        <main className="m-auto max-w-screen-2xl px-8 xl:px-14 font-poppins">
            <Nav store={store}/>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/auth=loggedIn/*" element={<Loader/>}/>
                <Route path="/my-library"
                       element={(
                           <>
                               <Playlists store={store}/>
                               <Outlet/>
                           </>)}>
                    <Route path="/my-library/playlist/:id/tracks" element={<Tracks store={store}/>}/>
                </Route>
                <Route path="*" element={<Error404/>} />
            </Routes>
        </main>
    );
}

export default Layout;
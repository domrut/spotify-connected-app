import React, {useEffect} from 'react';
import {Route, Routes, useNavigate} from "react-router";
import {Outlet} from "react-router-dom";
import Playlists from "../components/Playlists";
import Tracks from "../components/Tracks";
import Nav from "../components/Nav";
import Error404 from "../components/error404";
import Home from "../components/Home";
import Loader from "../components/Loader";
import SearchPage from "./SearchPage";

function Layout({store}) {
    return (
        <div className="m-auto px-2 font-poppins">
            <Nav store={store}/>
            <main className="m-auto">
                <Routes>
                    {!store.isLoggedIn && <Route path="/" element={<Home/>}/>}
                    {store.isLoggedIn &&
                        <>
                            <Route path="/search" element={<SearchPage store={store}/>}/>
                            <Route path="/auth=loggedIn/*" element={<Loader/>}/>
                            <Route path="/my-library"
                                   element={(
                                       <>
                                           <Playlists store={store}/>
                                           <Outlet/>
                                       </>)}>
                                <Route path="/my-library/playlist/:id/tracks" element={<Tracks store={store}/>}/>
                            </Route>
                        </>}
                    <Route path="*" element={<Error404/>}/>
                </Routes>
            </main>
        </div>
    );
}

export default Layout;
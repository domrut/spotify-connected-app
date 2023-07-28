import React from 'react';
import {Route, Routes} from "react-router";
import Playlists from "./Playlists";
import Nav from "../components/navigation/Nav";
import Error404 from "./error404";
import Home from "./Home";
import Loader from "../plugins/Loader";
import SearchPage from "./SearchPage";
import Footer from "./Footer";
import ArtistPage from "./ArtistPage";
import TracksPage from "./TracksPage";
import SelectedSongsPage from "./SelectedSongsPage";

function Layout({store}) {
    return (
        <div className="font-poppins min-h-[98vh] relative m-2">
            <Nav store={store}/>
            <main className="m-auto pb-[3rem]">
                <Routes>
                    {!sessionStorage.getItem("token") && <Route path="*" element={<Home/>}/>}
                    {sessionStorage.getItem("token") &&
                        <>
                            <Route path="/search" element={<SearchPage store={store}/>}/>
                            <Route path="/artists/:id/albums" element={<ArtistPage store={store}/>}/>
                            <Route path="/auth=loggedIn/*" element={<Loader/>}/>
                            <Route path="/my-library/" element={<Playlists store={store}/>}/>
                            <Route path="/selectedSongs" element={<SelectedSongsPage store={store}/>}/>
                            <Route path="/:type/:id/tracks" element={<TracksPage store={store}/>}/>
                            <Route path="*" element={<Error404/>}/>
                        </>
                    }
                </Routes>
            </main>
            <Footer/>
        </div>
    );
}

export default Layout;
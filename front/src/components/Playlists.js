import React, {useEffect, useState} from 'react';
import http from "../plugins/http";
import {updateError, updatePlaylists} from "../features/spotifyStore";
import {useDispatch} from "react-redux";
import Playlist from "./searchComps/searchResult/Playlist";

function Playlists({store}) {
    const dispatch = useDispatch();

    useEffect(() => {
        const getMyPlaylists = async () => {
            const res = await http.post("getMyPlaylists", {token: sessionStorage.getItem("token")});
            res.error ?
                dispatch(updateError({code: res.error.status, message: res.error.message})) :
                dispatch(updatePlaylists(res.data.items))
        }
        store.playlists.length === 0 && getMyPlaylists().catch(console.error)
    }, [])

    return (
        <div className="flex flex-wrap justify-center section-styling">
            {store.playlists && store.playlists.map((el, index) => {
                return <Playlist
                    key={index}
                    name={el.name}
                    owner={el.owner.display_name}
                    id={el.id}
                    image={el.images}
                    trackTotal={el.tracks.total}
                />
            })}
        </div>
    );
}

export default Playlists;
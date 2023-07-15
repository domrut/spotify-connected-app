import React, {useEffect} from 'react';
import Track from "./Track";
import http from "../plugins/http";
import {updateTracks} from "../features/spotifyStore";
import {useDispatch} from "react-redux";
import {useParams} from "react-router";

function Tracks({store}) {
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        const fetchTracks = async() => {
            const res = await http.post("playListTracks", {url: `https://api.spotify.com/v1/playlists/${params.id}/tracks`, token: sessionStorage.getItem("token")});
            dispatch(updateTracks(res.data.items))
        }
        fetchTracks().catch(console.error);
    }, [params.id])

    return (
        <div>
            {store.tracks && store.tracks.map((el, index) => {
                return <Track data={el} key={index}/>
            })}
        </div>
    );
}

export default Tracks;
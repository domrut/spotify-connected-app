import React, {useEffect, useState} from 'react';
import Track from "./searchComps/searchResult/Track";
import http from "../plugins/http";
import {updateError, updateTracks, updatetracksAudioData, updateTrackURIs} from "../features/spotifyStore";
import {useDispatch} from "react-redux";
import {useParams} from "react-router";

function Tracks({store}) {
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        const fetchTracks = async() => {
            let audioArray = [];
            const res = await http.post("playListTracks", {url: `https://api.spotify.com/v1/${params.type}/${params.id}/tracks`, token: sessionStorage.getItem("token")});
            if (res.error) {
                dispatch(updateError({code: res.error.status, message: res.error.message}))
            } else {
                dispatch(updateTracks(res.data.items))
                if (params.type === "playlists") {
                    dispatch(updateTrackURIs(res.data.items.map(el => ({uri:el.track.uri, selected: false}))))
                    audioArray = res.data.items.map(el => el.track.id)
                }
                if (params.type === "albums") {
                    dispatch(updateTrackURIs(res.data.items.map(el => ({uri:el.uri, selected: false}))))
                    audioArray = res.data.items.map(el => el.id)
                }
            }
            const fetchAudioData = await http.post("getTracksInfo", {url: `https://api.spotify.com/v1/audio-features?ids=${audioArray.join(",")}`, token: sessionStorage.getItem("token")})
            dispatch(updatetracksAudioData(fetchAudioData.data.audio_features))
        }
        fetchTracks();
    }, [params.id, params.type])

    return (
        <div>
            {store.tracks && store.tracks.map((el, index) => {
                return <Track data={el} key={index}/>
            })}
        </div>
    );
}

export default Tracks;
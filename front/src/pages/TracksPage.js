import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {useParams} from "react-router";
import http from "../plugins/http";
import {updateError, updateTracks, updateTracksAudioData, updateTrackURIs} from "../features/spotifyStore";
import Loader from "../plugins/Loader";
import Tracks from "../components/Tracks";
import MainTracksHeader from "../components/MainTracksHeader";

function TracksPage({store}) {
    const dispatch = useDispatch();
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [typeInfo, setTypeInfo] = useState([]);

    useEffect(() => {
        const fetchTracks = async () => {
            let audioArray = [];
            setIsLoading(true);
            const res = await http.post("playListTracks", {
                url: `https://api.spotify.com/v1/${params.type}/${params.id}/tracks`,
                token: sessionStorage.getItem("token")
            });
            if (res.error) {
                dispatch(updateError({code: res.error.status, message: res.error.message}))
            } else {
                dispatch(updateTracks(res.data.items))
                if (params.type === "playlists") {
                    const resPlaylist = await http.post("getAlbumOrPlaylist", {
                        url: `https://api.spotify.com/v1/${params.type}/${params.id}`,
                        token: sessionStorage.getItem("token")
                    });
                    setTypeInfo(resPlaylist.data)
                    dispatch(updateTrackURIs(res.data.items.map(el => ({uri: el.track.uri, selected: false}))))
                    audioArray = res.data.items.map(el => el.track.id)
                }
                if (params.type === "albums") {
                    const resAlbum = await http.post("getAlbumOrPlaylist", {
                        url: `https://api.spotify.com/v1/${params.type}/${params.id}`,
                        token: sessionStorage.getItem("token")
                    });
                    setTypeInfo(resAlbum.data)
                    dispatch(updateTrackURIs(res.data.items.map(el => ({uri: el.uri, selected: false}))))
                    audioArray = res.data.items.map(el => el.id)
                }
            }
            const fetchAudioData = await http.post("getTracksInfo", {
                url: `https://api.spotify.com/v1/audio-features?ids=${audioArray.join(",")}`,
                token: sessionStorage.getItem("token")
            })
            dispatch(updateTracksAudioData(fetchAudioData.data.audio_features))
            setIsLoading(false);
        }
        fetchTracks();
    }, [params.id, params.type])

    return (
        <div>
            {isLoading ? <Loader/> :
                <>
                    <MainTracksHeader type={params.type} data={typeInfo}/>
                    <Tracks store={store} type={params.type}/>
                </>
            }
        </div>
    );
}

export default TracksPage;
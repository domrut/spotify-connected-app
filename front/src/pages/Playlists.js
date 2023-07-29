import React, {useEffect, useState} from 'react';
import http from "../plugins/http";
import {
    updateCurrentUser,
    updateError,
    updatePlaylists,
    updateTracks,
    updateTracksAudioData,
    updateTrackURIs
} from "../features/spotifyStore";
import {useDispatch} from "react-redux";
import Playlist from "../components/searchComps/searchResult/Playlist";
import PlaylistAdd from "../components/PlaylistAdd";
import Loader from "../plugins/Loader";

function Playlists({store}) {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        dispatch(updateTracks([]))
        dispatch(updateTrackURIs([]))
        dispatch(updateTracksAudioData([]))
        setRefresh(false);
        setIsLoading(true);
        const getMyPlaylists = async () => {
            console.log("fetch?")
            const res = await http.post("getMyPlaylists", {token: sessionStorage.getItem("token")});
            if (res.error) {
                dispatch(updateError({code: res.error.status, message: res.error.message}))
            } else {
                dispatch(updatePlaylists(res.data.items))
                dispatch(updateCurrentUser(res.user))
            }
        }
        getMyPlaylists().then(() => setIsLoading(false))
    }, [refresh])

    return (
        <>
            <PlaylistAdd user={store.currentUser.id} setRefresh={setRefresh} refresh={refresh}/>
            <div className="flex flex-wrap justify-center section-styling">
                <div
                    className="flex-wrap block 2xs:flex h-[800px] content-start overflow-x-hidden justify-center max-h-[800px] overflow-y-scroll">
                    {isLoading ? <Loader/> :
                        <>
                            <p className="text-white text-2xl font-bold tracking-wide w-full text-center my-10">My
                                playlists</p>
                            {store.playlists ? store.playlists.map((el, index) => {
                                return <Playlist
                                    key={index}
                                    name={el.name}
                                    owner={el.owner.display_name}
                                    id={el.id}
                                    image={el.images}
                                    trackTotal={el.tracks.total}
                                />
                            }) : null}
                        </>
                    }
                </div>
            </div>
        </>
    );
}

export default Playlists;
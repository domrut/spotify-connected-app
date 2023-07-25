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
            const res = await http.post("getMyPlaylists", {token: sessionStorage.getItem("token")});
            if (res.error) {
                dispatch(updateError({code: res.error.status, message: res.error.message}))
            } else {
                dispatch(updatePlaylists(res.data.items))
                dispatch(updateCurrentUser(res.user))
            }
        }
        getMyPlaylists().catch(console.error)
        setIsLoading(false)
    }, [refresh])

    return (
        <>
            {isLoading ? <Loader/> :
                <>
                    <PlaylistAdd user={store.currentUser.id} setRefresh={setRefresh} refresh={refresh}/>
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
                </>

            }
        </>
    );
}

export default Playlists;
import React, {useEffect, useState} from 'react';
import http from "../plugins/http";
import {updateError, updateSelectedTrackURIs} from "../features/spotifyStore";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../plugins/Loader";
import Track from "../components/searchComps/searchResult/Track";
import TracksLegend from "../components/TracksLegend";
import Modal from "../components/Modal";
import {updateModalMenu} from "../features/hamburgerMenuStore";

function SelectedSongsPage({store}) {

    const dispatch = useDispatch();
    const [selectedSongs, setSelectedSongs] = useState([]);
    const [loading, setLoading] = useState(false);
    const modalStore = useSelector(store => store.hamburgerMenuStore);

    useEffect(() => {
        if (store.selectedTrackURIs.length === 0) return;
        let trackArray = [];
        setLoading(true);
        setSelectedSongs([]);
        store.selectedTrackURIs.map(el => trackArray.push(el.split(":")[2]))
        const fetchInChunks = () => {
            for (let i = 0; i < trackArray.length; i += 50) {
                const chunk = trackArray.slice(i, i + 50);
                const fetchData = async () => {
                    const res = await http.post("getTracks", {
                        url: `https://api.spotify.com/v1/tracks?ids=${chunk.join(",")}`,
                        token: localStorage.getItem("token")
                    });
                    if (res.error) {
                        dispatch(updateError({code: res.error.status, message: res.error.message}))
                    } else {
                        return res.data
                    }
                }
                fetchData().then(res => setSelectedSongs(prevState => [...prevState, ...res.tracks]));
            }
            setTimeout(() => {
                setLoading(false);
            }, 1000)
        }
        fetchInChunks();
    }, [])

    const selectTrack = (uri) => {
        dispatch(updateSelectedTrackURIs(uri))
    }

    return (
        <div className="section-styling">
            {modalStore.modalOpen && <Modal store={store} selectedSongs={selectedSongs}/>}
            {store.selectedTrackURIs.length !== 0 ?
                <>
                    {loading ? <Loader/> :
                        <>
                            <div className="flex flex-col items-center">
                                    <p className="text-white dark:text-black font-bold tracking-wide text-center text-lg sm:text-[1.75rem] mb-5">Selected
                                        songs</p>
                                <div className="text-center">
                                    <p className="text-white dark:text-black whitespace-normal my-5">Here you can see all the songs you have
                                        selected.</p>
                                    <p className="text-white dark:text-black whitespace-normal mt-5">Select the playlist you want to add the
                                        songs to.</p>
                                    <small className="text-neutral-400 dark:text-neutral-700">(Only your created playlists will be available)</small>
                                </div>
                                <p className="text-neutral-500 whitespace-normal text-center text-sm my-10">Select/remove
                                    songs to add by clicking on them</p>
                                <button onClick={() => dispatch(updateModalMenu(!modalStore.modalOpen))}
                                        className="rounded-xl transition duration-300 ease-in border-2 border-black bg-green-700 dark:bg-green-500 text-center p-2 sm:p-5 font-semibold tracking-wide w-max hover:bg-green-500 dark:hover:bg-green-700">Select
                                    Playlist
                                </button>
                            </div>
                            <div className="max-w-[1300px] w-full m-auto">
                                <TracksLegend/>
                                <div className="h-[800px] overflow-y-scroll">
                                    {(selectedSongs.length !== 0) && selectedSongs.map((el, index) => {
                                        return <Track
                                            artists={el.artists}
                                            duration={el.duration_ms}
                                            explicit={el.explicit}
                                            id={el.id}
                                            uri={el.uri}
                                            name={el.name}
                                            listen={el.preview_url}
                                            added={new Date().toISOString().split('T')[0]}
                                            index={index}
                                            selectedTracks={store.selectedTrackURIs}
                                            key={index}
                                            selectTrack={() => selectTrack(el.uri)}
                                            isLiked={store.selectedTrackURIs.includes(el.uri)}
                                        />
                                    })}
                                </div>
                            </div>
                        </>
                    }
                </> :
                <div className="h-[1081px]">
                    <p className="text-center font-bold tracking-wide text-white dark:text-black text-2xl mt-20">No songs selected
                        yet</p>
                </div>
            }
        </div>
    );
}

export default SelectedSongsPage;
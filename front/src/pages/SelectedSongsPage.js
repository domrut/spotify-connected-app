import React, {useEffect, useRef, useState} from 'react';
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
    const modalStore =  useSelector(store => store.hamburgerMenuStore)

    useEffect(() => {
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
                        token: sessionStorage.getItem("token")
                    });
                    if (res.error) {
                        dispatch(updateError({code: res.error.status, message: res.error.message}))
                    } else {
                        return res.data
                    }
                }
                fetchData().then(res => setSelectedSongs(prevState => [...prevState, ...res.tracks]));
            }
            console.log(trackArray.length === selectedSongs.length)
            // trackArray.length === selectedSongs.length && setLoading(false);
            setTimeout(() => {
                setLoading(false);
            }, 1000)
        }
        fetchInChunks();
    }, [])

    return (
        <div className="section-styling">
            {modalStore.modalOpen && <Modal store={store} selectedSongs={selectedSongs} />}
            {store.selectedTrackURIs.length !== 0 ?
                <>
                    {loading ? <Loader/> :
                        <>
                                <div className="flex flex-col items-center">
                                    <p className="text-white font-bold tracking-wide text-center text-lg sm:text-2xl mb-5">Selected songs</p>
                                    <p className="text-neutral-500 whitespace-normal text-center text-sm mb-5">Select/remove songs to add by clicking on them</p>
                                    <button onClick={() => dispatch(updateModalMenu(!modalStore.modalOpen))} className="rounded-xl border-2 border-black bg-green-700 text-center p-2 sm:p-5 font-semibold tracking-wide w-max hover:bg-green-500">Select Playlist</button>
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
                                        />
                                    })}
                                </div>
                            </div>
                        </>
                    }
                </> :
                <div className="h-[1081px]">
                    <p className="text-center font-bold tracking-wide text-white text-2xl mt-20">No songs selected yet</p>
                </div>
            }
        </div>
    );
}

export default SelectedSongsPage;
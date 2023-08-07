import React, {useEffect, useRef, useState} from 'react';
import Track from "./searchComps/searchResult/Track";
import http from "../plugins/http";
import {useNavigate, useParams} from "react-router";
import {updateTracks, updateTracksAudioData} from "../features/spotifyStore";
import {useDispatch} from "react-redux";
import TracksLegend from "./TracksLegend";
import NextPage from "../svgs/nextPage";
import PreviousPage from "../svgs/previousPage";

function Tracks({store, type, totalTracks}) {
    const [filteredArray, setFilteredArray] = useState(store.tracks)
    const [filteredArrayData, setFilteredArrayData] = useState(store.tracksAudioData)
    const [page, setPage] = useState(0)
    const params = useParams();
    const dispatch = useDispatch();
    const input = useRef();
    const nav = useNavigate();
    const filterHandler = (value) => {
        const filterTempo = store.tracksAudioData.filter(item => item.tempo >= value);
        let arr;
        if (type === "playlists") arr = store.tracks.filter(item => filterTempo.some(el => item.track.uri === el.uri))
        if (type === "albums") arr = store.tracks.filter(item => filterTempo.some(el => item.uri === el.uri))
        setFilteredArray(arr)
    }

    useEffect(() => {
        if (type === "albums") return;
        const fetchMoreTracks = async () => {
            let audioArray = [];
            input.current.value = "";
            const res = await http.post("playListTracks", {
                url: `https://api.spotify.com/v1/${params.type}/${params.id}/tracks?limit=100&offset=${page}`,
                token: localStorage.getItem("token")
            });
            dispatch(updateTracks(res.data.items))
            if (params.type === "playlists") {
                audioArray = res.data.items.map(el => el.track.id)
            }
            if (params.type === "albums") {
                audioArray = res.data.items.map(el => el.id)
            }
            const fetchAudioData = await http.post("getTracksInfo", {
                url: `https://api.spotify.com/v1/audio-features?ids=${audioArray.join(",")}`,
                token: localStorage.getItem("token")
            })
            dispatch(updateTracksAudioData(fetchAudioData.data.audio_features));
            setFilteredArrayData(fetchAudioData.data.audio_features)
            setFilteredArray(res.data.items)
        }

        fetchMoreTracks().catch(console.error)
    }, [page])

    const items = () => {
        if (type === "playlists") {
            return filteredArray.map((el, index) => {
                return <Track
                    artists={el.track.artists}
                    duration={el.track.duration_ms}
                    explicit={el.track.explicit}
                    id={el.track.id}
                    uri={el.track.uri}
                    name={el.track.name}
                    listen={el.track.preview_url}
                    index={index}
                    added={el.added_at}
                    tempo={filteredArrayData[index] !== null ? filteredArrayData[index].tempo : 0}
                    selectedTracks={store.selectedTrackURIs}
                    key={index}
                />
            })
        }
        if (type === "albums") {
            return filteredArray.map((el, index) => {
                return <Track
                    artists={el.artists}
                    duration={el.duration_ms}
                    explicit={el.explicit}
                    id={el.id}
                    uri={el.uri}
                    name={el.name}
                    listen={el.preview_url}
                    index={index}
                    added={totalTracks.release_date}
                    tempo={filteredArrayData[index] !== null ? filteredArrayData[index].tempo : 0}
                    selectedTracks={store.selectedTrackURIs}
                    key={index}
                />
            })
        }
    }

    return (
        <div className="section-styling flex flex-col">
            <div className="flex flex-col items-center">
                <p className="text-white dark:text-black font-bold tracking-wide text-lg sm:text-2xl my-10">Filter songs by <a className="underline ml-0.5" href="https://en.wikipedia.org/wiki/Tempo" target="_blank">tempo</a></p>
                <div className="text-center [&>*]:my-5 text-neutral-300 dark:text-neutral-800 max-w-3xl mb-10">
                    <p className="whitespace-normal">Select the songs to add to the playlist by clicking on them, deselect them by clicking again.</p>
                    <p className="whitespace-normal">You can select songs through multiple sources, they are still saved under <strong>"Selected"</strong></p>
                    <p className="whitespace-normal">Some songs you can preview before selecting them by clicking on play button</p>
                </div>
                <div className="flex flex-col items-center">
                <button className="rounded-xl transition duration-300 ease-in border-2 border-black bg-green-700 dark:bg-green-500 text-center p-2 sm:p-3 font-semibold tracking-wide w-max hover:bg-green-500 dark:hover:bg-green-700 mb-10" onClick={() => nav("/selectedSongs")}>Check selected songs</button>
                <label className="flex m-auto text-white dark:text-black filter_icon max-w-[15rem] mb-5">
                        <input
                        className="my-2 outline-none w-full bg-sectionColor dark:bg-sectionColorLight border-b-2 border-white dark:border-black text-white dark:text-black px-2 py-0.5"
                        type="number"
                        ref={input}
                        onChange={(e) => filterHandler(e.target.value)}
                        placeholder="Filter by tempo"/>
                </label>
                </div>
            </div>
            <div className="max-w-[1300px] w-full m-auto">
                <TracksLegend/>
                <div className="flex flex-col h-[800px] overflow-y-scroll mt-5">
                    {items()}
                </div>
                {(totalTracks.length !== 0 && store.tracks.length >= 0) && (totalTracks.tracks.total >= 100) &&
                    <div className="w-full text-center mt-5">
                        <button disabled={page === 0} className="text-white dark:text-black disabled:opacity-20 mr-10 mt-5 font-semibold text-base"
                                onClick={() => setPage(prevState => prevState - 100)}><PreviousPage/>
                        </button>
                        {(totalTracks.tracks.total > page) &&
                            <button disabled={store.tracks.length !== 100}
                                    className="text-white dark:text-black mt-5 font-semibold disabled:opacity-20 text-base"
                                    onClick={() => setPage(prevState => prevState + 100)}><NextPage/>
                            </button>
                        }
                    </div>
                }
            </div>
        </div>
    );
}

export default Tracks;

import React, {useEffect, useState} from 'react';
import http from "../../plugins/http";
import {addSearchResults, updateError} from "../../features/spotifyStore";
import {useDispatch} from "react-redux";
import Loader from "../../plugins/Loader";
import Album from "./searchResult/Album";
import Artist from "./searchResult/Artist";
import Playlist from "./searchResult/Playlist";

function SearchResults({store}) {

    const dispatch = useDispatch();
    const [filteredArray, setFilteredArray] = useState(store.additionalSearches)
    const [isLoading, setIsLoading] = useState(false);
    const fetchAdditionalResults = async () => {
        if (Object.values(store.searchResult)[0].next === null) return;
        setIsLoading(true);
        const res = await http.post("nextPage", {
            url: Object.values(store.searchResult)[0].next, token: sessionStorage.getItem("token")
        });
        if (res.error) {
            dispatch(updateError({code: res.error.status, message: res.error.message}))
        } else {
            dispatch(addSearchResults(res.data))
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setFilteredArray(store.additionalSearches);
    }, [store.additionalSearches])

    const filterHandler = (value) => {
        setFilteredArray(store.additionalSearches.filter(item => item.name.toLowerCase().includes(value.toLowerCase())))
    }

    const item = (type) => {
        if (type === "albums") {
            return filteredArray.map((el, index) => {
                    return <Album
                        key={index}
                        name={el.name}
                        albumType={el.album_type}
                        releaseDate={el.release_date}
                        artists={el.artists}
                        id={el.id}
                        image={el.images}
                    />
                }
            )
        }
        if (type === "artists") {
            return filteredArray.map((el, index) => {
                    return <Artist
                        key={index}
                        name={el.name}
                        id={el.id}
                        image={el.images}
                        genres={el.genres.slice(0, 2)}
                        followers={el.followers.total}
                    />
                }
            )
        }
        if (type === "playlists") {
            return filteredArray.map((el, index) => {
                    return <Playlist
                        key={index}
                        name={el.name}
                        owner={el.owner.display_name}
                        id={el.id}
                        image={el.images}
                        trackTotal={el.tracks.total}
                    />
                }
            )
        }
    }

    return (
        <>
            <label className="flex m-auto text-white filter_icon max-w-[17rem] mb-24">
                    <input
                        className="my-2 outline-none w-full bg-sectionColor border-b-2 border-white text-white px-2 py-0.5"
                        type="text"
                        onChange={(e) => filterHandler(e.target.value)}
                        placeholder={`Filter by ${Object.keys(store.searchResult)[0]} name`}/>
                </label>
            <div className="flex-wrap block 2xs:flex h-[800px] content-start justify-center max-h-[800px] overflow-y-scroll">
                {item(Object.keys(store.searchResult)[0])}
                {isLoading && <Loader/>}
                {Object.values(store.searchResult)[0].next !== null &&
                    <div className="w-full text-center">
                        <button className="text-white mt-5 font-semibold text-base"
                                onClick={fetchAdditionalResults}>Load more
                        </button>
                    </div>
                }
            </div>
        </>
    );
}

export default SearchResults;
import React, {useEffect, useState} from 'react';
import http from "../../plugins/http";
import {addSearchResults, updateError} from "../../features/spotifyStore";
import {useDispatch} from "react-redux";
import Loader from "../Loader";
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

    return (
        <div className="section-styling my-2">
            <p className="text-white text-center text-xl mb-5">Search results</p>
            <label className="flex m-auto text-white max-w-xs mb-5">
                <input
                    className="my-2 outline-0 w-full bg-sectionColor border-b-2 border-white text-white px-2 py-0.5"
                    type="text"
                    onChange={(e) => filterHandler(e.target.value)}
                    placeholder="Filter by name"/>
            </label>
            <button onClick={fetchAdditionalResults}>clik</button>
            <div className="flex-wrap flex h-[800px] justify-center max-h-[800px] overflow-y-scroll">
                {filteredArray.map((el, index) => {
                    switch (Object.keys(store.searchResult)[0]) {
                        case "albums":
                            return <Album
                                key={index}
                                name={el.name}
                                albumType={el.album_type}
                                releaseDate={el.release_date}
                                artists={el.artists}
                                id={el.id}
                                image={el.images}
                            />
                        case "artists":
                            return <Artist
                                key={index}
                                data={el}/>
                        case "playlists":
                            return <Playlist
                                key={index}
                                data={el}/>
                    }
                })
                }
                {isLoading && <Loader/>}
            </div>
        </div>
    );
}

export default SearchResults;
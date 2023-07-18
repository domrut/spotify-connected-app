import React, {useEffect, useRef, useState} from 'react';
import SearchResult from "./SearchResult";
import http from "../plugins/http";
import {addSearchResults, updateError} from "../features/spotifyStore";
import {useDispatch} from "react-redux";
import Loader from "./Loader";

function SearchResults({store}) {

    const dispatch = useDispatch();
    const [filteredArray, setFilteredArray] = useState(store.additionalSearches)
    const [isLoading, setIsLoading] = useState(false);
    const fetchScroll = async () => {
        setIsLoading(true);
        const res = await http.post("nextPage", {
            url: Object.values(store.searchResult)[0].next, token: sessionStorage.getItem("token")
        });
        if (res.error) {
            dispatch(updateError({code: res.error.status, message: res.error.message}))
        } else {
            dispatch(addSearchResults(res.data))
            setFilteredArray(prevItems => [...prevItems, ...Object.values(res.data)[0].items]);
            setIsLoading(false);
        }
    }

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
            <button onClick={fetchScroll}>clik</button>
            <div id="searchResults" className="flex-wrap flex max-h-[800px] overflow-y-scroll">
                {filteredArray.map((el, index) => {
                    return <SearchResult type={Object.keys(store.searchResult)} data={el} index={index}
                                         key={index}/>
                })
                }
                {isLoading && <Loader/>}
            </div>
        </div>
    );
}

export default SearchResults;
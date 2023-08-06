import React, {useRef, useState} from 'react';
import http from "../../plugins/http";
import {useDispatch} from "react-redux";
import {
    updateError,
    updateRecentSearches,
    updateSearchResults
} from "../../features/spotifyStore";
import SearchForm from "./SearchForm";
import RecentSearch from "./RecentSearch";

function Search({store}) {

    const input = useRef();
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState("album");
    const [error, setError] = useState("");
    const searchHandler = async (e) => {
        e.preventDefault();
        dispatch(updateSearchResults([]))
        setError("");
        if (input.current.value <= 1) return setError("Search input is empty")
        const res = await http.post("search", {
            query: input.current.value,
            category: selectedCategory,
            token: localStorage.getItem("token")
        });
        dispatch(updateRecentSearches(input.current.value));
        res.error ?
            dispatch(updateError({code: res.error.status, message: res.error.message})) :
            dispatch(updateSearchResults(res.data))
    }

    return (
        <div className="flex-3 flex flex-col section-styling">
            {error && <p className="text-red-500 font-bold py-2 text-center">{error}</p>}
            <p className="text-white dark:text-black font-bold whitespace-normal text-2xl text-center my-6">Find something new</p>
            <p className="whitespace-normal text-center text-neutral-300 dark:text-neutral-800 mb-5 max-w-md mx-auto">You can search for any
                artist, album or playlist by entering the search query and selecting the category below</p>
            <SearchForm input={input} selectedCategory={setSelectedCategory} searchHandler={searchHandler}/>
            <div className="flex flex-col items-center mt-5 text-white dark:text-black min-h-[3.25rem]">
                <p className="text-sm mb-5 sm:mb-0">Recent searches</p>
                <div className="flex w-full overflow-x-scroll">
                    {store.recentSearches && store.recentSearches.map((el, index) => {
                        return <RecentSearch key={index} input={input} data={el}/>
                    })}
                </div>
            </div>
        </div>
    );
}

export default Search;
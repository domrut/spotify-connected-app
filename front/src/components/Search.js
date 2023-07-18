import React, {useEffect, useRef, useState} from 'react';
import {Button} from "../styled/Button.styled";
import http from "../plugins/http";
import {useDispatch} from "react-redux";
import {
    updateError,
    updateRecentSearches,
    updateSearchResults
} from "../features/spotifyStore";

function Search({store}) {

    const input = useRef();
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState("album");
    const [error, setError] = useState("");
    const searchHandler = async (e) => {
        e.preventDefault();
        setError("");
        if (input.current.value <= 1) return setError("Search input is empty")
        const res = await http.post("search", {
            query: input.current.value,
            category: selectedCategory,
            token: sessionStorage.getItem("token")
        });
        dispatch(updateRecentSearches(input.current.value));
        res.error ?
            dispatch(updateError({code: res.error.status, message: res.error.message})) :
            dispatch(updateSearchResults(res.data))
    }

    return (
        <div className="flex-3 flex flex-col justify-between section-styling">
            {error && <p className="text-red-500 font-bold py-2 text-center">{error}</p>}
            <p className="text-white font-bold text-xl text-center my-6">Find something new</p>
            <form
                className="[&>*]:my-5 mb-10 flex flex-col justify-between items-center">
                <label className="flex items-center w-full text-white max-w-xs flex-col md:flex-row">
                    <input
                        className="my-2 outline-0 w-full bg-sectionColor border-b-2 border-white text-white px-2 py-0.5"
                        type="text"
                        ref={input}
                        placeholder="Search..."/>
                </label>
                <label className="flex items-center w-full text-white max-w-xs flex-col">
                    <select
                        className="my-2 w-full outline-0 bg-sectionColor border-b-2 border-white px-2 py-0.5 text-white"
                        name="selectedCategory" id="categories" onChange={e => setSelectedCategory(e.target.value)}>
                        <option className="bg-sectionColor text-white" value="album">Album</option>
                        <option className="bg-sectionColor text-white" value="artist">Artist</option>
                        <option className="bg-sectionColor text-white" value="playlist">Playlist</option>
                    </select>
                </label>
                <Button className="btn-nav" onClick={(e) => searchHandler(e)}>Search</Button>
            </form>
            <div className="flex flex-col items-center mt-5 text-white min-h-[3.25rem]">
                <p className="text-sm mb-5 sm:mb-0">Recent searches</p>
                <div className="flex w-full overflow-x-scroll">
                    {store.recentSearches && store.recentSearches.map((el, index) => {
                        return <div
                            className="my-4 mr-2 cursor-pointer h-[36px] rounded-full px-6 py-2.5 text-xs font-normal bg-neutral-800"
                            key={index}
                            onClick={() => input.current.value = el}>
                            <p>{el}</p>
                        </div>
                    })}
                </div>
            </div>
        </div>
    );
}

export default Search;
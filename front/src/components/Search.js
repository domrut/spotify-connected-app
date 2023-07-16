import React, {useRef, useState} from 'react';
import {Button} from "../styled/Button.styled";
import http from "../plugins/http";
import {useDispatch} from "react-redux";
import {updateError, updateSearchResults} from "../features/spotifyStore";

function Search() {

    const input = useRef();
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState("album");
    const [error, setError] = useState("");

    const searchHandler = async (e) => {
        e.preventDefault();
        setError("");
        if (input.current.value <= 1) return setError("Enter the search query value")
        const res = await http.post("search", {
            query: input.current.value,
            category: selectedCategory,
            token: sessionStorage.getItem("token")
        });
        res.error ?
            dispatch(updateError({code: res.error.status, message: res.error.message})) :
            dispatch(updateSearchResults(res.data))
    }

    return (
        <div>
            {error && <p className="text-red-500 font-bold py-4 text-center">{error}</p>}
            <form className="max-w-5xl mb-10 m-auto flex flex-col md:flex-row justify-evenly items-center">
                <label className="flex items-center w-full text-white max-w-xs md:w-auto flex-col md:flex-row">
                    Search for
                    <input className="my-2 w-full bg-[#121212] border-2 border-white rounded-lg text-white px-2 py-0.5 md:mx-4 md:my-0 md:w-48" type="text"
                           ref={input}
                            placeholder="Search..."/>
                </label>
                <label className="flex items-center w-full text-white max-w-xs md:w-auto flex-col md:flex-row">
                    Category
                    <select className="my-2 w-full bg-[#121212] border-2 border-white rounded-lg px-2 py-0.5 md:mx-4 md:my-0 text-white md:w-48"
                            name="selectedCategory" id="categories" onChange={e => setSelectedCategory(e.target.value)}>
                        <option className="bg-[#121212] text-white" value="album">Album</option>
                        <option className="bg-[#121212] text-white" value="artist">Artist</option>
                        <option className="bg-[#121212] text-white" value="playlist">Playlist</option>
                    </select>
                </label>
                <Button className="btn-nav" onClick={(e) => searchHandler(e)}>Search</Button>
            </form>
        </div>
    );
}

export default Search;
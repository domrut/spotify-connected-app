import React from 'react';
import {Button} from "../../styled/Button.styled";

function SearchForm({input, selectedCategory, searchHandler}) {
    return (
        <form
            className="[&>*]:my-5 mb-10 flex flex-col justify-between items-center">
            <label className="flex items-center w-full text-white dark:text-black max-w-xs flex-col md:flex-row">
                <input
                    className="my-2 outline-0 w-full bg-sectionColor dark:bg-sectionColorLight border-b-2 border-white dark:border-black text-white dark:text-black px-2 py-0.5"
                    type="text"
                    ref={input}
                    placeholder="Search..."/>
            </label>
            <label className="flex items-center w-full text-white max-w-xs flex-col">
                <select
                    className="my-2 w-full outline-0 bg-sectionColor dark:bg-sectionColorLight border-b-2 border-white dark:border-black px-2 py-0.5 text-white dark:text-black"
                    name="selectedCategory" id="categories" onChange={e => selectedCategory(e.target.value)}>
                    <option className="bg-sectionColor dark:bg-sectionColorLight text-white dark:text-black" value="album">Album</option>
                    <option className="bg-sectionColor dark:bg-sectionColorLight text-white dark:text-black" value="artist">Artist</option>
                    <option className="bg-sectionColor dark:bg-sectionColorLight text-white dark:text-black" value="playlist">Playlist</option>
                </select>
            </label>
            <button className="btn-nav" onClick={(e) => searchHandler(e)}>Search</button>
        </form>
    );
}

export default SearchForm;

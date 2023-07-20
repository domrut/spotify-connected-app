import React from 'react';
import {Button} from "../../styled/Button.styled";

function SearchForm({input, selectedCategory, searchHandler}) {
    return (
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
                    name="selectedCategory" id="categories" onChange={e => selectedCategory(e.target.value)}>
                    <option className="bg-sectionColor text-white" value="album">Album</option>
                    <option className="bg-sectionColor text-white" value="artist">Artist</option>
                    <option className="bg-sectionColor text-white" value="playlist">Playlist</option>
                </select>
            </label>
            <Button className="btn-nav" onClick={(e) => searchHandler(e)}>Search</Button>
        </form>
    );
}

export default SearchForm;
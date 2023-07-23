import React from 'react';
import Search from "../components/searchComps/Search";
import MyTopSpotify from "../components/MyTopSpotify";
import SearchResults from "../components/searchComps/SearchResults";
import Loader from "../components/Loader";

function SearchPage({store}) {
    return (
        <>
            <div className="flex flex-col-reverse gap-y-2 sm:gap-x-2 md:flex-row">
                <Search store={store}/>
                <MyTopSpotify store={store}/>
            </div>
            <div className="section-styling my-2">
                <p className="text-white text-center text-xl mb-10">Search results</p>
                {store.additionalSearches.length !== 0 ? <SearchResults store={store}/> : <Loader/>}
            </div>
        </>
    );
}

export default SearchPage;
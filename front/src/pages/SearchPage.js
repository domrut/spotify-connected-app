import React from 'react';
import Search from "../components/searchComps/Search";
import MyTopSpotify from "../components/MyTopSpotify";
import SearchResults from "../components/searchComps/SearchResults";

function SearchPage({store}) {
    return (
        <>
            <div className="flex flex-col-reverse gap-y-2 sm:gap-x-2 md:flex-row">
                <Search store={store}/>
                <MyTopSpotify store={store}/>
            </div>
            {store.searchResult.length !== 0 && <SearchResults store={store}/>}
        </>
    );
}

export default SearchPage;
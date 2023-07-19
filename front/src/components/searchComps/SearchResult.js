import React from 'react';
import Album from "./searchResult/Album";
import Artist from "./searchResult/Artist";
import Playlist from "./searchResult/Playlist";

function SearchResult({data, index, type}) {

    console.log("searchresult rendered")
    const whichRender = (type) => {
        switch (type) {
            case "albums":
                return <Album
                    name={data.name}
                    releaseDate={data.release_date}
                    artists={data.artists}
                    id={data.id}
                    image={data.images}
                />
            case "artists":
                return <Artist data={data} />
            case "playlists":
                return <Playlist data={data} />
        }
    }

    return (
        <>
            {whichRender(type[0])}
        </>
    );
}

export default SearchResult;
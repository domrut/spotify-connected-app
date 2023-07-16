import React from 'react';
import Album from "./searchResult/Album";
import Artist from "./searchResult/Artist";
import Playlist from "./searchResult/Playlist";

function SearchResult({data, index, type}) {

    const whichRender = (type) => {
        switch (type) {
            case "albums":
                return <Album data={data} />
            case "artists":
                return <Artist data={data} />
            case "playlists":
                return <Playlist data={data} />
        }
    }

    return (
        <div key={index}>
            {whichRender(type[0])}
        </div>
    );
}

export default SearchResult;
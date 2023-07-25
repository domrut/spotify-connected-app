import React from 'react';
import TrackAlbum from "./TrackAlbum";
import TrackPlaylist from "./TrackPlaylist";

function MainTracksHeader({data, type}) {

    const item = (type) => {
        let fullDuration = 0;
        if (type === "playlists") {
            data.tracks.items.forEach(el => fullDuration += el.track.duration_ms);
            return <TrackPlaylist
                owner={data.owner}
                description={data.description}
                external_urls={data.external_urls.spotify}
                itemDuration={fullDuration}
                image={data.images}
                name={data.name}
                tracks={data.tracks.total}
                type={data.type}
            />
        }
        if (type === "albums") {
            data.tracks.items.forEach(el => fullDuration += el.duration_ms);
            return <TrackAlbum
                artists={data.artists}
                copyrights={data.copyrights}
                external_urls={data.external_urls.spotify}
                itemDuration={fullDuration}
                image={data.images}
                name={data.name}
                releaseDate={data.release_date}
                tracks={data.total_tracks}
                type={data.type}
            />
        }
    }

    return (
        <div className="section-styling mb-2 flex flex-col xs:flex-row text-white">
            {data.length !== 0 && item(type)}
        </div>
    );
}

export default MainTracksHeader;